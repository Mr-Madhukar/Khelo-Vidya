import { SEED_DATA } from '../db/seedData.js';
import { AttemptAnswer } from '../types/index.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

interface SchoolRow {
  id: string;
  name: string;
  udise_code: string;
  district: string;
  created_at: string;
}

interface UserRow {
  id: string;
  role: string;
  name: string;
  email_or_username: string;
  password_hash: string;
  school_id: string | null;
  class_section: string | null;
  grade: number | null;
  language_pref: string;
  created_at: string;
}

interface TopicRow {
  id: string;
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia: string;
  order_index: number;
  created_at: string;
}

interface LessonRow {
  id: string;
  topic_id: string;
  title: string;
  title_odia: string;
  content_version: number;
  language: string;
  content_body: Record<string, unknown>;
  media_refs: string[];
  created_at: string;
}

interface QuestionRow {
  id: string;
  lesson_id: string;
  question_text: string;
  question_text_odia: string;
  options: string[];
  options_odia: string[];
  correct_option: number;
  difficulty_tag: 'easy' | 'medium' | 'hard';
  points: number;
  order_index: number;
}

interface AttemptRow {
  id: string;
  attempt_uuid: string;
  student_id: string;
  lesson_id: string;
  answers: AttemptAnswer[];
  client_submitted_score: number;
  server_computed_score: number;
  total_questions: number;
  correct_answers: number;
  status: string;
  submitted_at: string;
  synced_at: string;
}

interface ProgressRow {
  id: string;
  student_id: string;
  topic_id: string;
  mastery_level: number;
  total_points: number;
  lessons_completed: number;
  last_activity_at: string;
}

interface BadgeRow {
  id: string;
  student_id: string;
  badge_id: string;
  badge_name: string;
  badge_name_odia: string;
  earned_at: string;
}

interface LessonProgressRow {
  id: string;
  student_id: string;
  lesson_id: string;
  current_level: number;
  xp: number;
  score: number;
  difficulty: 'easy' | 'medium' | 'hard';
  plant_stage: string;
  completed: boolean;
  updated_at: string;
}

class InMemDB {
  schools: SchoolRow[] = [];
  users: UserRow[] = [];
  topics: TopicRow[] = [];
  lessons: LessonRow[] = [];
  questions: QuestionRow[] = [];
  attempts: AttemptRow[] = [];
  progress: ProgressRow[] = [];
  badges: BadgeRow[] = [];
  lessonProgress: LessonProgressRow[] = [];

  constructor() {
    this.initSeedData();
  }

  initSeedData() {
    this.schools = [
      { id: 'sch-1', name: 'Govt. High School, Khordha', udise_code: '21170100101', district: 'Khordha', created_at: new Date().toISOString() },
      { id: 'sch-2', name: 'Biju Patnaik High School, Ganjam', udise_code: '21190200302', district: 'Ganjam', created_at: new Date().toISOString() },
      { id: 'sch-3', name: 'Mayurbhanj Tribal Model School, Baripada', udise_code: '21070300403', district: 'Mayurbhanj', created_at: new Date().toISOString() },
      { id: 'sch-4', name: 'Kalahandi Model Vidyalaya, Bhawanipatna', udise_code: '21260400504', district: 'Kalahandi', created_at: new Date().toISOString() },
    ];

    const demoPasswordHash = bcrypt.hashSync('password123', 10);
    this.users = [
      {
        id: '00000000-0000-0000-0000-000000000001',
        role: 'student',
        name: 'Subhashree Dash',
        email_or_username: 'subhashree_7',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-A',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000004',
        role: 'student',
        name: 'Debasish Mohanty',
        email_or_username: 'debasish_7a',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-A',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000005',
        role: 'student',
        name: 'Priyanka Nayak',
        email_or_username: 'priyanka_7a',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-A',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000006',
        role: 'student',
        name: 'Rajesh Kumar Sahoo',
        email_or_username: 'rajesh_7b',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-B',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000007',
        role: 'student',
        name: 'Lipika Sethi',
        email_or_username: 'lipika_7b',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-B',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000008',
        role: 'student',
        name: 'Manas Ranjan Pradhan',
        email_or_username: 'manas_7a',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: '7-A',
        grade: 7,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        role: 'teacher',
        name: 'Pradeep Kumar Nayak',
        email_or_username: 'teacher_pradeep',
        password_hash: demoPasswordHash,
        school_id: 'sch-1',
        class_section: 'STEM-Facilitator',
        grade: null,
        language_pref: 'or',
        created_at: new Date().toISOString(),
      },
      {
        id: '00000000-0000-0000-0000-000000000003',
        role: 'admin',
        name: 'SME Dept Admin',
        email_or_username: 'admin_odisha',
        password_hash: demoPasswordHash,
        school_id: null,
        class_section: null,
        grade: null,
        language_pref: 'en',
        created_at: new Date().toISOString(),
      },
    ];

    SEED_DATA.forEach((tData, tIdx) => {
      const topicId = `topic-${tIdx + 1}`;
      this.topics.push({
        id: topicId,
        subject: tData.subject,
        grade: tData.grade,
        topic_name: tData.topic_name,
        topic_name_odia: tData.topic_name_odia,
        order_index: tData.order_index,
        created_at: new Date().toISOString(),
      });

      tData.lessons.forEach((lData, lIdx) => {
        const lessonId = `lesson-${tIdx + 1}-${lIdx + 1}`;
        this.lessons.push({
          id: lessonId,
          topic_id: topicId,
          title: lData.title,
          title_odia: lData.title_odia,
          content_version: lData.content_version,
          language: lData.language,
          content_body: lData.content_body,
          media_refs: lData.media_refs,
          created_at: new Date().toISOString(),
        });

        lData.questions.forEach((qData, qIdx) => {
          this.questions.push({
            id: `q-${lessonId}-${qIdx + 1}`,
            lesson_id: lessonId,
            question_text: qData.question_text,
            question_text_odia: qData.question_text_odia,
            options: qData.options,
            options_odia: qData.options_odia,
            correct_option: qData.correct_option,
            difficulty_tag: qData.difficulty_tag,
            points: qData.points,
            order_index: qIdx + 1,
          });
        });
      });
    });

    // Seed initial student progress for class analytics
    this.progress = [
      { id: 'p-1', student_id: '00000000-0000-0000-0000-000000000001', topic_id: 'topic-1', mastery_level: 100, total_points: 50, lessons_completed: 2, last_activity_at: new Date().toISOString() },
      { id: 'p-2', student_id: '00000000-0000-0000-0000-000000000001', topic_id: 'topic-5', mastery_level: 100, total_points: 60, lessons_completed: 2, last_activity_at: new Date().toISOString() },
      { id: 'p-3', student_id: '00000000-0000-0000-0000-000000000004', topic_id: 'topic-1', mastery_level: 80, total_points: 40, lessons_completed: 2, last_activity_at: new Date().toISOString() },
      { id: 'p-4', student_id: '00000000-0000-0000-0000-000000000004', topic_id: 'topic-3', mastery_level: 50, total_points: 25, lessons_completed: 1, last_activity_at: new Date().toISOString() },
      { id: 'p-5', student_id: '00000000-0000-0000-0000-000000000005', topic_id: 'topic-5', mastery_level: 90, total_points: 55, lessons_completed: 2, last_activity_at: new Date().toISOString() },
      { id: 'p-6', student_id: '00000000-0000-0000-0000-000000000006', topic_id: 'topic-7', mastery_level: 45, total_points: 20, lessons_completed: 1, last_activity_at: new Date().toISOString() },
      { id: 'p-7', student_id: '00000000-0000-0000-0000-000000000007', topic_id: 'topic-1', mastery_level: 85, total_points: 45, lessons_completed: 2, last_activity_at: new Date().toISOString() },
      { id: 'p-8', student_id: '00000000-0000-0000-0000-000000000008', topic_id: 'topic-3', mastery_level: 55, total_points: 25, lessons_completed: 1, last_activity_at: new Date().toISOString() },
    ];

    this.badges = [
      { id: 'b-1', student_id: '00000000-0000-0000-0000-000000000001', badge_id: 'first_step', badge_name: 'First Step in Science', badge_name_odia: 'ପ୍ରଥମ ଶିକ୍ଷା ପଦକ୍ଷେପ', earned_at: new Date().toISOString() },
      { id: 'b-2', student_id: '00000000-0000-0000-0000-000000000001', badge_id: 'stem_explorer', badge_name: 'STEM Explorer', badge_name_odia: 'STEM ଅଭିଯାତ୍ରୀ', earned_at: new Date().toISOString() },
      { id: 'b-3', student_id: '00000000-0000-0000-0000-000000000004', badge_id: 'first_step', badge_name: 'First Step in Science', badge_name_odia: 'ପ୍ରଥମ ଶିକ୍ଷା ପଦକ୍ଷେପ', earned_at: new Date().toISOString() },
      { id: 'b-4', student_id: '00000000-0000-0000-0000-000000000005', badge_id: 'perfect_score', badge_name: 'Perfect Score 100%', badge_name_odia: 'ଶତ ପ୍ରତିଶତ କୁଇଜ୍ ସ୍କୋର', earned_at: new Date().toISOString() },
    ];
  }

  query(sql: string, params: unknown[] = []): { rows: unknown[]; rowCount: number } {
    const cleanSql = sql.trim().replace(/\s+/g, ' ');

    // 1. SELECT FROM schools
    if (/SELECT .* FROM schools/i.test(cleanSql)) {
      return { rows: [...this.schools], rowCount: this.schools.length };
    }

    // 2. SELECT FROM users WHERE LOWER(email_or_username) = LOWER($1)
    if (/SELECT .* FROM users .* WHERE LOWER\(.*email_or_username.*\) = LOWER\(\$1\)/i.test(cleanSql)) {
      const email = String(params[0] || '').toLowerCase().trim();
      const user = this.users.find((u) => u.email_or_username.toLowerCase() === email);
      if (user) {
        const school = this.schools.find((s) => s.id === user.school_id);
        return { rows: [{ ...user, school_name: school?.name || null }], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    // 3. SELECT FROM users WHERE id = $1
    if (/SELECT .* FROM users .* WHERE (u\.)?id = \$1/i.test(cleanSql)) {
      const user = this.users.find((u) => u.id === params[0]);
      if (user) {
        const school = this.schools.find((s) => s.id === user.school_id);
        return { rows: [{ ...user, school_name: school?.name || null, district: school?.district || null }], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    // 3b. SELECT FROM users for teacher (student list)
    if (/SELECT .* FROM users/i.test(cleanSql)) {
      if (/WHERE (u\.)?role = 'student'/i.test(cleanSql)) {
        const students = this.users.filter((u) => u.role === 'student');
        return { rows: students, rowCount: students.length };
      }
      return { rows: [...this.users], rowCount: this.users.length };
    }

    // 4. INSERT INTO users
    if (/INSERT INTO users/i.test(cleanSql)) {
      const id = crypto.randomUUID();
      const newUser: UserRow = {
        id,
        role: String(params[0] || 'student'),
        name: String(params[1] || ''),
        email_or_username: String(params[2] || ''),
        password_hash: String(params[3] || ''),
        school_id: (params[4] as string) || null,
        class_section: (params[5] as string) || null,
        grade: (params[6] as number) || null,
        language_pref: (params[7] as string) || 'or',
        created_at: new Date().toISOString(),
      };
      this.users.push(newUser);
      return { rows: [newUser], rowCount: 1 };
    }

    // 5. SELECT FROM content_topics (with lesson_count)
    if (/SELECT .* FROM content_topics/i.test(cleanSql)) {
      let filtered = [...this.topics];
      let pIdx = 0;
      if (/ct\.grade = \$/i.test(cleanSql)) {
        const gradeVal = Number(params[pIdx++]);
        filtered = filtered.filter((t) => t.grade === gradeVal);
      }
      if (/ct\.subject ILIKE \$/i.test(cleanSql)) {
        const subVal = String(params[pIdx++] || '').toLowerCase().replace(/%/g, '');
        filtered = filtered.filter((t) => t.subject.toLowerCase().includes(subVal));
      }

      const rows = filtered.map((t) => {
        const count = this.lessons.filter((l) => l.topic_id === t.id).length;
        return { ...t, lesson_count: count };
      });
      return { rows, rowCount: rows.length };
    }

    // 6. SELECT FROM lessons (with question_count)
    if (/SELECT .* FROM lessons l/i.test(cleanSql) && !/WHERE l\.id = \$1/i.test(cleanSql)) {
      let filtered = [...this.lessons];
      let pIdx = 0;
      if (/l\.topic_id = \$/i.test(cleanSql)) {
        const tId = params[pIdx++];
        filtered = filtered.filter((l) => l.topic_id === tId);
      }
      if (/ct\.grade = \$/i.test(cleanSql)) {
        const gradeVal = Number(params[pIdx++]);
        const matchingTopicIds = this.topics.filter((t) => t.grade === gradeVal).map((t) => t.id);
        filtered = filtered.filter((l) => matchingTopicIds.includes(l.topic_id));
      }
      if (/ct\.subject ILIKE \$/i.test(cleanSql)) {
        const subVal = String(params[pIdx++] || '').toLowerCase().replace(/%/g, '');
        const matchingTopicIds = this.topics.filter((t) => t.subject.toLowerCase().includes(subVal)).map((t) => t.id);
        filtered = filtered.filter((l) => matchingTopicIds.includes(l.topic_id));
      }

      const rows = filtered.map((l) => {
        const topic = this.topics.find((t) => t.id === l.topic_id);
        const qCount = this.questions.filter((q) => q.lesson_id === l.id).length;
        return {
          ...l,
          subject: topic?.subject || '',
          grade: topic?.grade || 7,
          topic_name: topic?.topic_name || '',
          topic_name_odia: topic?.topic_name_odia || '',
          question_count: qCount,
        };
      });
      return { rows, rowCount: rows.length };
    }

    // 7. SELECT FROM lessons WHERE id = $1
    if (/SELECT .* FROM lessons .* WHERE (l\.)?id = \$1/i.test(cleanSql)) {
      const lesson = this.lessons.find((l) => l.id === params[0]);
      if (lesson) {
        const topic = this.topics.find((t) => t.id === lesson.topic_id);
        return {
          rows: [
            {
              ...lesson,
              subject: topic?.subject || '',
              grade: topic?.grade || 7,
              topic_name: topic?.topic_name || '',
              topic_name_odia: topic?.topic_name_odia || '',
            },
          ],
          rowCount: 1,
        };
      }
      return { rows: [], rowCount: 0 };
    }

    // 8. SELECT FROM quiz_questions WHERE lesson_id = $1
    if (/SELECT .* FROM quiz_questions WHERE lesson_id = \$1/i.test(cleanSql)) {
      const qs = this.questions.filter((q) => q.lesson_id === params[0]);
      return { rows: qs, rowCount: qs.length };
    }

    // 9. SELECT id, attempt_uuid FROM attempts WHERE attempt_uuid = $1
    if (/SELECT .* FROM attempts WHERE attempt_uuid = \$1/i.test(cleanSql)) {
      const att = this.attempts.filter((a) => a.attempt_uuid === params[0]);
      return { rows: att, rowCount: att.length };
    }

    // 9b. SELECT FROM attempts for teacher (all attempts)
    if (/SELECT .* FROM attempts/i.test(cleanSql) && !/WHERE/i.test(cleanSql)) {
      const rows = this.attempts.map((a) => {
        const lesson = this.lessons.find((l) => l.id === a.lesson_id);
        const topic = lesson ? this.topics.find((t) => t.id === lesson.topic_id) : undefined;
        return {
          ...a,
          lesson_title: lesson?.title || 'STEM Lesson',
          lesson_title_odia: lesson?.title_odia || '',
          subject: topic?.subject || 'STEM',
          topic_name: topic?.topic_name || '',
          topic_name_odia: topic?.topic_name_odia || '',
          topic_id: topic?.id || '',
        };
      });
      return { rows, rowCount: rows.length };
    }

    // 10. INSERT INTO attempts
    if (/INSERT INTO attempts/i.test(cleanSql)) {
      const newAttempt: AttemptRow = {
        id: crypto.randomUUID(),
        attempt_uuid: String(params[0] || ''),
        student_id: String(params[1] || ''),
        lesson_id: String(params[2] || ''),
        answers: typeof params[3] === 'string' ? JSON.parse(params[3]) : (params[3] as AttemptAnswer[]),
        client_submitted_score: Number(params[4]) || 0,
        server_computed_score: Number(params[5]) || 0,
        total_questions: Number(params[6]) || 0,
        correct_answers: Number(params[7]) || 0,
        status: 'synced',
        submitted_at: new Date().toISOString(),
        synced_at: new Date().toISOString(),
      };
      this.attempts.push(newAttempt);
      return { rows: [newAttempt], rowCount: 1 };
    }

    // 11. UPDATE attempts
    if (/UPDATE attempts/i.test(cleanSql)) {
      const idx = this.attempts.findIndex((a) => a.attempt_uuid === params[0]);
      if (idx !== -1) {
        this.attempts[idx].synced_at = new Date().toISOString();
        this.attempts[idx].status = 'synced';
        return { rows: [this.attempts[idx]], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    // 12. Topic attempts for progress
    if (/SELECT a\.lesson_id, MAX\(a\.server_computed_score\)/i.test(cleanSql)) {
      const studentId = params[0] as string;
      const topicId = params[1] as string;
      const topicLessons = this.lessons.filter((l) => l.topic_id === topicId).map((l) => l.id);
      const studentAttempts = this.attempts.filter(
        (a) => a.student_id === studentId && topicLessons.includes(a.lesson_id)
      );

      const byLesson = new Map<string, { max_score: number; max_correct: number; max_total: number }>();
      studentAttempts.forEach((a) => {
        const curr = byLesson.get(a.lesson_id) || { max_score: 0, max_correct: 0, max_total: 0 };
        curr.max_score = Math.max(curr.max_score, a.server_computed_score);
        curr.max_correct = Math.max(curr.max_correct, a.correct_answers);
        curr.max_total = Math.max(curr.max_total, a.total_questions);
        byLesson.set(a.lesson_id, curr);
      });

      const rows = Array.from(byLesson.entries()).map(([lesson_id, data]) => ({
        lesson_id,
        ...data,
      }));
      return { rows, rowCount: rows.length };
    }

    // 13. COUNT FROM lessons WHERE topic_id = $1
    if (/SELECT COUNT\(\*\)::int as count FROM lessons WHERE topic_id = \$1/i.test(cleanSql)) {
      const count = this.lessons.filter((l) => l.topic_id === params[0]).length;
      return { rows: [{ count }], rowCount: 1 };
    }

    // 14. INSERT / UPDATE progress
    if (/INSERT INTO progress/i.test(cleanSql)) {
      const student_id = String(params[0]);
      const topic_id = String(params[1]);
      const mastery_level = Number(params[2]);
      const total_points = Number(params[3]);
      const lessons_completed = Number(params[4]);

      const idx = this.progress.findIndex((p) => p.student_id === student_id && p.topic_id === topic_id);
      if (idx !== -1) {
        this.progress[idx].mastery_level = mastery_level;
        this.progress[idx].total_points = total_points;
        this.progress[idx].lessons_completed = lessons_completed;
        this.progress[idx].last_activity_at = new Date().toISOString();
        return { rows: [this.progress[idx]], rowCount: 1 };
      } else {
        const newProg: ProgressRow = {
          id: crypto.randomUUID(),
          student_id,
          topic_id,
          mastery_level,
          total_points,
          lessons_completed,
          last_activity_at: new Date().toISOString(),
        };
        this.progress.push(newProg);
        return { rows: [newProg], rowCount: 1 };
      }
    }

    // 15. SELECT COUNT(*) FROM attempts WHERE student_id = $1
    if (/SELECT COUNT\(\*\)::int as count FROM attempts WHERE student_id = \$1/i.test(cleanSql)) {
      const count = this.attempts.filter((a) => a.student_id === params[0]).length;
      return { rows: [{ count }], rowCount: 1 };
    }

    // 16. SELECT COUNT(DISTINCT lesson_id) FROM attempts WHERE student_id = $1
    if (/SELECT COUNT\(DISTINCT lesson_id\)::int as count FROM attempts WHERE student_id = \$1/i.test(cleanSql)) {
      const unique = new Set(this.attempts.filter((a) => a.student_id === params[0]).map((a) => a.lesson_id));
      return { rows: [{ count: unique.size }], rowCount: 1 };
    }

    // 17. SELECT SUM(total_points) FROM progress WHERE student_id = $1
    if (/SELECT COALESCE\(SUM\(total_points\)/i.test(cleanSql)) {
      const total = this.progress
        .filter((p) => p.student_id === params[0])
        .reduce((sum, p) => sum + p.total_points, 0);
      return { rows: [{ total }], rowCount: 1 };
    }

    // 18. INSERT INTO badges_earned
    if (/INSERT INTO badges_earned/i.test(cleanSql)) {
      const student_id = String(params[0]);
      const badge_id = String(params[1]);
      const badge_name = String(params[2]);
      const badge_name_odia = String(params[3]);

      const exists = this.badges.some((b) => b.student_id === student_id && b.badge_id === badge_id);
      if (exists) {
        return { rows: [], rowCount: 0 };
      }
      const newBadge: BadgeRow = {
        id: crypto.randomUUID(),
        student_id,
        badge_id,
        badge_name,
        badge_name_odia,
        earned_at: new Date().toISOString(),
      };
      this.badges.push(newBadge);
      return { rows: [newBadge], rowCount: 1 };
    }

    // 19. SELECT FROM progress WHERE student_id = $1
    if (/SELECT .* FROM progress p .* WHERE p\.student_id = \$1/i.test(cleanSql)) {
      const progs = this.progress.filter((p) => p.student_id === params[0]);
      const rows = progs.map((p) => {
        const topic = this.topics.find((t) => t.id === p.topic_id);
        const topicLessonsCount = this.lessons.filter((l) => l.topic_id === p.topic_id).length;
        return {
          ...p,
          subject: topic?.subject || '',
          grade: topic?.grade || 7,
          topic_name: topic?.topic_name || '',
          topic_name_odia: topic?.topic_name_odia || '',
          total_topic_lessons: topicLessonsCount,
        };
      });
      return { rows, rowCount: rows.length };
    }

    // 19b. SELECT FROM progress (all students for teacher)
    if (/SELECT .* FROM progress/i.test(cleanSql)) {
      const rows = this.progress.map((p) => {
        const topic = this.topics.find((t) => t.id === p.topic_id);
        return {
          ...p,
          subject: topic?.subject || 'STEM',
          grade: topic?.grade || 7,
          topic_name: topic?.topic_name || '',
          topic_name_odia: topic?.topic_name_odia || '',
        };
      });
      return { rows, rowCount: rows.length };
    }

    // 20. SELECT FROM badges_earned WHERE student_id = $1
    if (/SELECT .* FROM badges_earned WHERE student_id = \$1/i.test(cleanSql)) {
      const userBadges = this.badges.filter((b) => b.student_id === params[0]);
      return { rows: userBadges, rowCount: userBadges.length };
    }

    // 21. SELECT FROM lesson_progress WHERE student_id = $1 AND lesson_id = $2
    if (/SELECT .* FROM lesson_progress WHERE student_id = \$1 AND lesson_id = \$2/i.test(cleanSql)) {
      const lp = this.lessonProgress.filter((p) => p.student_id === params[0] && p.lesson_id === params[1]);
      return { rows: lp, rowCount: lp.length };
    }

    // 22. SELECT FROM lesson_progress WHERE student_id = $1
    if (/SELECT .* FROM lesson_progress WHERE student_id = \$1/i.test(cleanSql)) {
      const lp = this.lessonProgress.filter((p) => p.student_id === params[0]);
      return { rows: lp, rowCount: lp.length };
    }

    // 23. INSERT / UPSERT INTO lesson_progress
    if (/INSERT INTO lesson_progress/i.test(cleanSql)) {
      const student_id = String(params[0]);
      const lesson_id = String(params[1]);
      const current_level = Number(params[2]) || 1;
      const xp = Number(params[3]) || 0;
      const score = Number(params[4]) || 0;
      const difficulty = (params[5] as 'easy' | 'medium' | 'hard') || 'medium';
      const plant_stage = String(params[6] || 'seed');
      const completed = Boolean(params[7]);

      const idx = this.lessonProgress.findIndex((p) => p.student_id === student_id && p.lesson_id === lesson_id);
      if (idx !== -1) {
        this.lessonProgress[idx] = {
          ...this.lessonProgress[idx],
          current_level,
          xp,
          score,
          difficulty,
          plant_stage,
          completed,
          updated_at: new Date().toISOString(),
        };
        return { rows: [this.lessonProgress[idx]], rowCount: 1 };
      } else {
        const newRow: LessonProgressRow = {
          id: crypto.randomUUID(),
          student_id,
          lesson_id,
          current_level,
          xp,
          score,
          difficulty,
          plant_stage,
          completed,
          updated_at: new Date().toISOString(),
        };
        this.lessonProgress.push(newRow);
        return { rows: [newRow], rowCount: 1 };
      }
    }

    console.warn('[InMemDB] Unhandled SQL query, returning empty:', cleanSql);
    return { rows: [], rowCount: 0 };
  }
}

export const inMemDB = new InMemDB();
