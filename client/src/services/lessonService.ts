import { apiRequest } from './api.ts';
import { db } from '../db/dexie.ts';
import {
  ContentTopic,
  LessonSummary,
  CachedLesson,
  CachedQuestion,
  AttemptSubmissionResponse,
  StudentProgressSummary,
  QueuedAttempt,
  CachedBadge,
} from '../types/index.ts';

export async function fetchTopics(grade?: number, subject?: string): Promise<ContentTopic[]> {
  try {
    const params = new URLSearchParams();
    if (grade) params.append('grade', grade.toString());
    if (subject) params.append('subject', subject);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiRequest<{ success: boolean; topics: ContentTopic[] }>(`/topics${queryStr}`);
    return res.topics || [];
  } catch (_err) {
    console.warn('[lessonService] Offline: reading topics from local Dexie cache...');
    const cached = await db.lessons_cache.toArray();
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
  grade?: number;
  subject?: string;
}): Promise<LessonSummary[]> {
  try {
    const params = new URLSearchParams();
    if (filter?.topic_id) params.append('topic_id', filter.topic_id);
    if (filter?.grade) params.append('grade', filter.grade.toString());
    if (filter?.subject) params.append('subject', filter.subject);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await apiRequest<{ success: boolean; lessons: LessonSummary[] }>(`/lessons${queryStr}`);
    const lessons = res.lessons || [];

    // Background cache update for offline readiness
    if (lessons.length > 0) {
      lessons.forEach(async (l) => {
        const existing = await db.lessons_cache.get(l.id);
        if (!existing) {
          await db.lessons_cache.put({
            id: l.id,
            topicId: l.topic_id,
            grade: l.grade,
            subject: l.subject,
            title: l.title,
            titleOdia: l.title_odia || undefined,
            contentVersion: l.content_version,
            language: l.language,
            contentBody: {},
            questions: [],
            cachedAt: new Date().toISOString(),
          });
        }
      });
    }

    return lessons;
  } catch (_err) {
    console.warn('[lessonService] Offline: loading lessons from IndexedDB cache...');
    let cached = await db.lessons_cache.toArray();

    if (filter?.topic_id) {
      cached = cached.filter((l) => l.topicId === filter.topic_id);
    }
    if (filter?.grade) {
      cached = cached.filter((l) => l.grade === filter.grade);
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
      question_count: l.questions ? l.questions.length : 0,
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
    if (local) {
      return local;
    }
    throw new Error('Lesson not available offline. Please connect to the internet to download this lesson pack.');
  }
}

export async function isLessonCachedLocally(id: string): Promise<boolean> {
  const item = await db.lessons_cache.get(id);
  return Boolean(item && item.questions && item.questions.length > 0);
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
    console.warn('[lessonService] Offline submission: attempt securely preserved in local queue.');

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
        correct_option: a.selected_option, // placeholder offline
        is_correct: true,
        points_earned: 10,
      })),
      newBadges: [],
      progress: {
        topicId: '',
        masteryPercent: Math.round((payload.correctAnswers / (payload.totalQuestions || 1)) * 100),
        completedLessonsCount: 1,
        topicTotalPoints: payload.clientSubmittedScore,
      },
    };
  }
}

export async function fetchStudentProgress(): Promise<StudentProgressSummary> {
  try {
    const res = await apiRequest<{ success: boolean } & StudentProgressSummary>('/progress/me');
    return {
      stats: res.stats,
      topicProgress: res.topicProgress,
      badges: res.badges,
    };
  } catch (_err) {
    console.warn('[lessonService] Offline: assembling student progress from local IndexedDB...');
    const attempts = await db.attempts_queue.toArray();
    const badges = await db.badges_cache.toArray();

    const totalPoints = attempts.reduce((sum, a) => sum + (a.clientSubmittedScore || 0), 0);
    const uniqueLessons = new Set(attempts.map((a) => a.lessonId));

    return {
      stats: {
        totalPoints,
        totalCompletedLessons: uniqueLessons.size,
        badgesCount: badges.length,
      },
      topicProgress: [],
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
