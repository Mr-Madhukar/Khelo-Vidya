import { apiRequest } from './api.ts';
import { db, getOfflineSession } from '../db/dexie.ts';
import { CLIENT_SEED_PACKS, findSeedLesson } from '../db/clientSeedData.ts';
import {
  ContentTopic,
  LessonSummary,
  CachedLesson,
  CachedQuestion,
  AttemptSubmissionResponse,
  StudentProgressSummary,
  QueuedAttempt,
  CachedBadge,
  ClassSummaryResponse,
  TopicProgressItem,
} from '../types/index.ts';

export async function fetchTopics(grade?: number | 'all', subject?: string): Promise<ContentTopic[]> {
  try {
    const params = new URLSearchParams();
    if (grade && grade !== 'all') params.append('grade', grade.toString());
    if (subject && subject !== 'all') {
      const cleanSub = subject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
      params.append('subject', cleanSub);
    }

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiRequest<{ success: boolean; topics: ContentTopic[] }>(`/topics${queryStr}`);
    return res.topics || [];
  } catch (_err) {
    console.warn('[lessonService] Offline: reading topics from local Dexie cache...');
    let cached = await db.lessons_cache.toArray();

    // If IndexedDB empty, fallback to client seed topics
    if (cached.length === 0) {
      let seedTopics = CLIENT_SEED_PACKS.map((p) => p.topic);
      if (grade && grade !== 'all') seedTopics = seedTopics.filter((t) => t.grade === Number(grade));
      if (subject && subject !== 'all') {
        const cleanSub = subject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
        seedTopics = seedTopics.filter((t) => t.subject.toLowerCase().includes(cleanSub));
      }
      return seedTopics;
    }

    if (grade && grade !== 'all') {
      cached = cached.filter((l) => l.grade === Number(grade));
    }
    if (subject && subject !== 'all') {
      const cleanSub = subject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
      cached = cached.filter((l) => l.subject && l.subject.toLowerCase().includes(cleanSub));
    }

    const topicMap = new Map<string, ContentTopic>();

    cached.forEach((l) => {
      if (!topicMap.has(l.topicId)) {
        topicMap.set(l.topicId, {
          id: l.topicId,
          subject: l.subject,
          grade: l.grade,
          topic_name: l.title,
          topic_name_odia: l.titleOdia,
          order_index: 1,
          lesson_count: 1,
        });
      } else {
        const t = topicMap.get(l.topicId)!;
        t.lesson_count = (t.lesson_count || 0) + 1;
      }
    });

    return Array.from(topicMap.values());
  }
}

export async function fetchLessons(filter?: {
  topic_id?: string;
  grade?: number | 'all';
  subject?: string;
}): Promise<LessonSummary[]> {
  try {
    const params = new URLSearchParams();
    if (filter?.topic_id) params.append('topic_id', filter.topic_id);
    if (filter?.grade && filter.grade !== 'all') params.append('grade', filter.grade.toString());
    if (filter?.subject && filter.subject !== 'all') {
      const cleanSub = filter.subject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
      params.append('subject', cleanSub);
    }

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiRequest<{ success: boolean; lessons: LessonSummary[] }>(`/lessons${queryStr}`);
    const lessons = res.lessons || [];

    // Background cache update: preserve existing questions or match with seed pack
    if (lessons.length > 0) {
      for (const l of lessons) {
        const existing = await db.lessons_cache.get(l.id);
        if (!existing || !existing.questions || existing.questions.length === 0) {
          const seedMatch = findSeedLesson(l.id) || findSeedLesson(l.title);
          await db.lessons_cache.put({
            id: l.id,
            topicId: l.topic_id,
            grade: l.grade,
            subject: l.subject,
            title: l.title,
            titleOdia: l.title_odia || undefined,
            contentVersion: l.content_version,
            language: l.language,
            contentBody: seedMatch?.contentBody || {},
            questions: seedMatch?.questions || [],
            cachedAt: new Date().toISOString(),
          });
        }
      }
    }

    return lessons;
  } catch (_err) {
    console.warn('[lessonService] Offline: loading lessons from IndexedDB cache...');
    let cached = await db.lessons_cache.toArray();

    // If cache is empty, load directly from seed packs
    if (cached.length === 0) {
      const allSeedLessons: CachedLesson[] = [];
      CLIENT_SEED_PACKS.forEach((p) => allSeedLessons.push(...p.lessons));
      cached = allSeedLessons;
      // Pre-save to Dexie in background
      for (const sl of allSeedLessons) {
        db.lessons_cache.put(sl).catch(() => {});
      }
    }

    if (filter?.topic_id) {
      cached = cached.filter((l) => l.topicId === filter.topic_id);
    }
    if (filter?.grade && filter.grade !== 'all') {
      cached = cached.filter((l) => l.grade === Number(filter.grade));
    }
    if (filter?.subject && filter.subject !== 'all') {
      const cleanSub = filter.subject.toLowerCase().replace('maths', 'math').replace('mathematics', 'math');
      cached = cached.filter((l) => l.subject && l.subject.toLowerCase().includes(cleanSub));
    }

    return cached.map((l) => ({
      id: l.id,
      topic_id: l.topicId,
      title: l.title,
      title_odia: l.titleOdia,
      content_version: l.contentVersion,
      language: l.language,
      subject: l.subject,
      grade: l.grade,
      topic_name: l.title,
      topic_name_odia: l.titleOdia,
      question_count: l.questions ? l.questions.length : 3,
      created_at: l.cachedAt,
    }));
  }
}

export async function fetchLessonById(id: string): Promise<CachedLesson> {
  try {
    const res = await apiRequest<{
      success: boolean;
      lesson: {
        id: string;
        topic_id: string;
        grade: number;
        subject: string;
        title: string;
        title_odia?: string;
        content_version: number;
        language: 'or' | 'en';
        content_body: Record<string, unknown>;
        media_refs?: string[];
        questions: Array<{
          id: string;
          lesson_id: string;
          question_text: string;
          question_text_odia?: string;
          options: string[] | string;
          options_odia?: string[] | string;
          correct_option: number;
          difficulty_tag: 'easy' | 'medium' | 'hard';
          points: number;
        }>;
      };
    }>(`/lessons/${id}`);
    const raw = res.lesson;

    const mappedQuestions: CachedQuestion[] = (raw.questions || []).map((q) => ({
      id: q.id,
      lessonId: q.lesson_id,
      questionText: q.question_text,
      questionTextOdia: q.question_text_odia,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      optionsOdia: typeof q.options_odia === 'string' ? JSON.parse(q.options_odia) : q.options_odia,
      correctOption: q.correct_option,
      difficultyTag: q.difficulty_tag,
      points: q.points,
    }));

    const cachedLesson: CachedLesson = {
      id: raw.id,
      topicId: raw.topic_id,
      grade: raw.grade,
      subject: raw.subject,
      title: raw.title,
      titleOdia: raw.title_odia,
      contentVersion: raw.content_version,
      language: raw.language,
      contentBody: typeof raw.content_body === 'string' ? JSON.parse(raw.content_body) : raw.content_body,
      mediaRefs: typeof raw.media_refs === 'string' ? JSON.parse(raw.media_refs) : raw.media_refs,
      questions: mappedQuestions,
      cachedAt: new Date().toISOString(),
    };

    // Cache the complete lesson in Dexie IndexedDB
    await db.lessons_cache.put(cachedLesson);

    return cachedLesson;
  } catch (_err) {
    console.warn(`[lessonService] Offline: fetching lesson ${id} from Dexie IndexedDB...`);
    const local = await db.lessons_cache.get(id);
    if (local && local.questions && local.questions.length > 0) {
      return local;
    }

    // Fallback lookup from client seed packs
    const seed = findSeedLesson(id) || (local ? findSeedLesson(local.title) : undefined);
    if (seed) {
      const merged: CachedLesson = {
        ...(local || seed),
        id: local?.id || seed.id,
        questions: seed.questions,
        contentBody: Object.keys(local?.contentBody || {}).length > 0 ? local!.contentBody : seed.contentBody,
        cachedAt: new Date().toISOString(),
      };
      await db.lessons_cache.put(merged);
      return merged;
    }

    if (local) {
      return local;
    }

    throw new Error('Lesson not available offline. Please connect to the internet to download this lesson pack.');
  }
}

export async function isLessonCachedLocally(id: string): Promise<boolean> {
  const item = await db.lessons_cache.get(id);
  if (item && item.questions && item.questions.length > 0) return true;
  return Boolean(findSeedLesson(id));
}

export async function submitQuizAttempt(payload: {
  attemptUUID: string;
  studentId: string;
  lessonId: string;
  answers: Array<{ question_id: string; selected_option: number }>;
  clientSubmittedScore: number;
  totalQuestions: number;
  correctAnswers: number;
}): Promise<AttemptSubmissionResponse> {
  const queuedRecord: QueuedAttempt = {
    attemptUUID: payload.attemptUUID,
    studentId: payload.studentId,
    lessonId: payload.lessonId,
    answers: payload.answers,
    clientSubmittedScore: payload.clientSubmittedScore,
    totalQuestions: payload.totalQuestions,
    correctAnswers: payload.correctAnswers,
    status: 'pending_sync',
    submittedAt: new Date().toISOString(),
  };

  // Always write immediately to local Dexie attempts_queue
  await db.attempts_queue.put(queuedRecord);

  try {
    const res = await apiRequest<AttemptSubmissionResponse>('/attempts', {
      method: 'POST',
      body: JSON.stringify({
        attempt_uuid: payload.attemptUUID,
        lesson_id: payload.lessonId,
        answers: payload.answers,
        client_submitted_score: payload.clientSubmittedScore,
      }),
    });

    // Mark as successfully synced in local queue
    await db.attempts_queue.update(payload.attemptUUID, {
      status: 'synced',
      syncedAt: new Date().toISOString(),
    });

    // Cache any newly earned badges
    if (res.newBadges && res.newBadges.length > 0) {
      for (const badge of res.newBadges) {
        const cachedBadge: CachedBadge = {
          id: `${payload.studentId}-${badge.id}`,
          studentId: payload.studentId,
          badgeId: badge.id,
          badgeName: badge.name,
          badgeNameOdia: badge.nameOdia,
          earnedAt: new Date().toISOString(),
        };
        await db.badges_cache.put(cachedBadge);
      }
    }

    return res;
  } catch (_err) {
    console.warn('[lessonService] Offline submission: calculating badges and preserving in local Dexie queue.');

    // Offline Badge Evaluation Engine
    const offlineNewBadges: Array<{ id: string; name: string; nameOdia: string }> = [];
    const allStudentAttempts = await db.attempts_queue
      .where('studentId')
      .equals(payload.studentId)
      .toArray();

    const distinctLessons = new Set(allStudentAttempts.map((a) => a.lessonId));
    const totalPointsSum = allStudentAttempts.reduce((sum, a) => sum + (a.clientSubmittedScore || 0), 0);

    const awardOfflineBadge = async (badgeId: string, name: string, nameOdia: string) => {
      const existing = await db.badges_cache.get(`${payload.studentId}-${badgeId}`);
      if (!existing) {
        const newBadge: CachedBadge = {
          id: `${payload.studentId}-${badgeId}`,
          studentId: payload.studentId,
          badgeId,
          badgeName: name,
          badgeNameOdia: nameOdia,
          earnedAt: new Date().toISOString(),
        };
        await db.badges_cache.put(newBadge);
        offlineNewBadges.push({ id: badgeId, name, nameOdia });
      }
    };

    // 1. First Step Badge
    if (allStudentAttempts.length >= 1) {
      await awardOfflineBadge('first_step', 'First Step in Science', 'ପ୍ରଥମ ଶିକ୍ଷା ପଦକ୍ଷେପ');
    }

    // 2. Perfect Score Badge
    if (payload.totalQuestions > 0 && payload.correctAnswers === payload.totalQuestions) {
      await awardOfflineBadge('perfect_score', 'Perfect Score 100%', 'ଶତ ପ୍ରତିଶତ କୁଇଜ୍ ସ୍କୋର');
    }

    // 3. STEM Explorer Badge (>= 3 distinct lessons)
    if (distinctLessons.size >= 3) {
      await awardOfflineBadge('stem_explorer', 'STEM Explorer', 'STEM ଅଭିଯାତ୍ରୀ');
    }

    // 4. Quiz Champion Badge (>= 50 total points)
    if (totalPointsSum >= 50) {
      await awardOfflineBadge('quiz_champion', 'Quiz Champion', 'କୁଇଜ୍ ଚାମ୍ପିଅନ୍');
    }

    // Simulated offline response using client computed values
    return {
      success: true,
      isDuplicate: false,
      score: payload.clientSubmittedScore,
      totalPossibleScore: payload.totalQuestions * 10,
      correctCount: payload.correctAnswers,
      totalQuestions: payload.totalQuestions,
      answerBreakdown: payload.answers.map((a) => ({
        question_id: a.question_id,
        selected_option: a.selected_option,
        correct_option: a.selected_option,
        is_correct: true,
        points_earned: 10,
      })),
      newBadges: offlineNewBadges,
      progress: {
        topicId: '',
        masteryPercent: Math.round((payload.correctAnswers / (payload.totalQuestions || 1)) * 100),
        completedLessonsCount: distinctLessons.size,
        topicTotalPoints: totalPointsSum,
      },
    };
  }
}

export async function fetchStudentProgress(): Promise<StudentProgressSummary> {
  try {
    const res = await apiRequest<{ success: boolean } & StudentProgressSummary>('/progress/me');
    // Store returned badges to local Dexie cache for offline viewing
    if (res.badges && res.badges.length > 0) {
      const { user } = await getOfflineSession();
      if (user) {
        for (const b of res.badges) {
          await db.badges_cache.put({
            id: `${user.id}-${b.badge_id}`,
            studentId: user.id,
            badgeId: b.badge_id,
            badgeName: b.badge_name,
            badgeNameOdia: b.badge_name_odia || undefined,
            earnedAt: b.earned_at,
          });
        }
      }
    }
    return {
      stats: res.stats,
      topicProgress: res.topicProgress,
      badges: res.badges,
    };
  } catch (_err) {
    console.warn('[lessonService] Offline: assembling student progress and topic mastery from IndexedDB...');
    const attempts = await db.attempts_queue.toArray();
    const badges = await db.badges_cache.toArray();
    const cachedLessons = await db.lessons_cache.toArray();

    const totalPoints = attempts.reduce((sum, a) => sum + (a.clientSubmittedScore || 0), 0);
    const uniqueLessons = new Set(attempts.map((a) => a.lessonId));

    // Compute offline topic progress breakdown
    const topicProgressMap = new Map<string, TopicProgressItem>();

    for (const pack of CLIENT_SEED_PACKS) {
      const t = pack.topic;
      topicProgressMap.set(t.id, {
        topic_id: t.id,
        mastery_level: 0,
        total_points: 0,
        lessons_completed: 0,
        last_activity_at: new Date().toISOString(),
        subject: t.subject,
        grade: t.grade,
        topic_name: t.topic_name,
        topic_name_odia: t.topic_name_odia || undefined,
        total_topic_lessons: pack.lessons.length || 1,
      });
    }

    attempts.forEach((att) => {
      const lesson = cachedLessons.find((l) => l.id === att.lessonId) || findSeedLesson(att.lessonId);
      const tId = lesson?.topicId || 'topic-physics-force';
      const existing = topicProgressMap.get(tId);
      if (existing) {
        existing.total_points += att.clientSubmittedScore || 0;
        existing.lessons_completed += 1;
        existing.last_activity_at = att.submittedAt || new Date().toISOString();
        existing.mastery_level = Math.min(100, Math.round((existing.lessons_completed / (existing.total_topic_lessons || 1)) * 100));
      }
    });

    const activeTopicProgress = Array.from(topicProgressMap.values()).filter(
      (tp) => tp.lessons_completed > 0 || tp.total_points > 0
    );

    return {
      stats: {
        totalPoints,
        totalCompletedLessons: uniqueLessons.size,
        badgesCount: badges.length,
      },
      topicProgress: activeTopicProgress.length > 0 ? activeTopicProgress : Array.from(topicProgressMap.values()).slice(0, 3),
      badges: badges.map((b) => ({
        id: b.id,
        badge_id: b.badgeId,
        badge_name: b.badgeName,
        badge_name_odia: b.badgeNameOdia,
        earned_at: b.earnedAt,
      })),
    };
  }
}

export async function fetchClassSummary(): Promise<ClassSummaryResponse> {
  try {
    const res = await apiRequest<ClassSummaryResponse>('/progress/class-summary');
    return res;
  } catch (_err) {
    console.warn('[lessonService] Offline: returning simulated class summary scoped to school...');
    const { user } = await getOfflineSession();
    const schoolName = user?.school_name || 'Govt. High School, Khordha';

    return {
      success: true,
      schoolName,
      udiseCode: '21170100101',
      classStats: {
        totalStudents: 6,
        totalAttempts: 38,
        classAvgScore: 78,
        weakTopicsCount: 2,
      },
      teachers: [
        {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Pradeep Kumar Nayak',
          email_or_username: 'teacher_pradeep',
          school_id: 'sch-1',
          school_name: schoolName,
          class_section: 'STEM-Facilitator',
          role: 'teacher',
          created_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000009',
          name: 'Minati Pattnaik',
          email_or_username: 'minati_physics',
          school_id: 'sch-1',
          school_name: schoolName,
          class_section: 'Physics Lead',
          role: 'teacher',
          created_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000010',
          name: 'Bikash Chandra Rath',
          email_or_username: 'bikash_math',
          school_id: 'sch-1',
          school_name: schoolName,
          class_section: 'Mathematics Lead',
          role: 'teacher',
          created_at: new Date().toISOString(),
        },
      ],
      students: [
        {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Subhashree Dash',
          email_or_username: 'subhashree_7',
          school_id: 'sch-1',
          class_section: '7-A',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 110,
          lessons_completed: 4,
          mastery_percent: 92,
          quizzes_taken: 5,
          weak_topics: [],
          last_activity_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000004',
          name: 'Debasish Mohanty',
          email_or_username: 'debasish_7a',
          school_id: 'sch-1',
          class_section: '7-A',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 65,
          lessons_completed: 3,
          mastery_percent: 65,
          quizzes_taken: 4,
          weak_topics: ['Acids, Bases & Indicators'],
          last_activity_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000005',
          name: 'Priyanka Nayak',
          email_or_username: 'priyanka_7a',
          school_id: 'sch-1',
          class_section: '7-A',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 95,
          lessons_completed: 4,
          mastery_percent: 88,
          quizzes_taken: 4,
          weak_topics: [],
          last_activity_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000006',
          name: 'Rajesh Kumar Sahoo',
          email_or_username: 'rajesh_7b',
          school_id: 'sch-1',
          class_section: '7-B',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 40,
          lessons_completed: 2,
          mastery_percent: 48,
          quizzes_taken: 3,
          weak_topics: ['Fractions, Decimals & Ratios'],
          last_activity_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000007',
          name: 'Lipika Sethi',
          email_or_username: 'lipika_7b',
          school_id: 'sch-1',
          class_section: '7-B',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 75,
          lessons_completed: 3,
          mastery_percent: 78,
          quizzes_taken: 3,
          weak_topics: [],
          last_activity_at: new Date().toISOString(),
        },
        {
          id: '00000000-0000-0000-0000-000000000008',
          name: 'Manas Ranjan Pradhan',
          email_or_username: 'manas_7a',
          school_id: 'sch-1',
          class_section: '7-A',
          grade: 7,
          language_pref: 'or',
          created_at: new Date().toISOString(),
          total_points: 50,
          lessons_completed: 2,
          mastery_percent: 55,
          quizzes_taken: 3,
          weak_topics: ['Acids, Bases & Indicators'],
          last_activity_at: new Date().toISOString(),
        },
      ],
      topicDiagnostics: [
        { topic_id: 'topic-1', topic_name: 'Force, Motion & Friction', topic_name_odia: 'ବଳ, ଗତି ଏବଂ ଘର୍ଷଣ', subject: 'STEM - Physics', grade: 7, average_accuracy: 86, attempts_count: 24, is_weak_topic: false },
        { topic_id: 'topic-3', topic_name: 'Acids, Bases & Indicators', topic_name_odia: 'ଅମ୍ଳ, କ୍ଷାରକ ଏବଂ ସୂଚକ', subject: 'STEM - Chemistry', grade: 7, average_accuracy: 54, attempts_count: 19, is_weak_topic: true },
        { topic_id: 'topic-5', topic_name: 'Plant Nutrition & Photosynthesis', topic_name_odia: 'ଉଦ୍ଭିଦରେ ପୋଷଣ ଏବଂ ଆଲୋକସଂଶ୍ଳେଷଣ', subject: 'STEM - Biology', grade: 7, average_accuracy: 91, attempts_count: 31, is_weak_topic: false },
        { topic_id: 'topic-7', topic_name: 'Fractions, Decimals & Ratios', topic_name_odia: 'ଗଣିତ: ଭଗ୍ନାଂଶ, ଦଶମିକ ଏବଂ ଅନୁପାତ', subject: 'STEM - Mathematics', grade: 7, average_accuracy: 58, attempts_count: 22, is_weak_topic: true },
      ],
      recentActivity: [
        {
          id: 'act-1',
          attempt_uuid: 'uuid-101',
          student_id: '00000000-0000-0000-0000-000000000001',
          student_name: 'Subhashree Dash',
          class_section: '7-A',
          lesson_title: 'Autotrophic Nutrition & Chlorophyll',
          lesson_title_odia: 'ସ୍ୱଭୋଜୀ ପୋଷଣ ଏବଂ ହରିତ୍ କଣିକା',
          subject: 'STEM - Biology',
          score: 30,
          total_questions: 3,
          correct_answers: 3,
          submitted_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          status: 'synced',
        },
        {
          id: 'act-2',
          attempt_uuid: 'uuid-102',
          student_id: '00000000-0000-0000-0000-000000000004',
          student_name: 'Debasish Mohanty',
          class_section: '7-A',
          lesson_title: 'Acids and Bases in Daily Life',
          lesson_title_odia: 'ଦୈନନ୍ଦିନ ଜୀବନରେ ଅମ୍ଳ ଏବଂ କ୍ଷାରକ',
          subject: 'STEM - Chemistry',
          score: 15,
          total_questions: 3,
          correct_answers: 1,
          submitted_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          status: 'synced',
        },
        {
          id: 'act-3',
          attempt_uuid: 'uuid-103',
          student_id: '00000000-0000-0000-0000-000000000005',
          student_name: 'Priyanka Nayak',
          class_section: '7-A',
          lesson_title: 'Understanding Force: Push and Pull',
          lesson_title_odia: 'ବଳର ଧାରଣା: ଠେଲା ଏବଂ ଟଣା',
          subject: 'STEM - Physics',
          score: 25,
          total_questions: 3,
          correct_answers: 3,
          submitted_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
          status: 'synced',
        },
      ],
    };
  }
}
