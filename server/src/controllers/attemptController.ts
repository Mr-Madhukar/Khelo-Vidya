import { Response } from 'express';
import { query } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

interface SubmitAnswerItem {
  question_id: string;
  selected_option: number;
}

// POST /api/attempts
export async function submitAttempt(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ success: false, error: 'Unauthorized user' });
      return;
    }

    const { attempt_uuid, lesson_id, answers, client_submitted_score } = req.body;

    if (!attempt_uuid || !lesson_id || !Array.isArray(answers)) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: attempt_uuid, lesson_id, or answers array',
      });
      return;
    }

    // 1. Fetch lesson and questions from database for ground-truth verification
    const lessonRes = await query(
      `SELECT l.id, l.topic_id, ct.subject, ct.grade
       FROM lessons l
       JOIN content_topics ct ON ct.id = l.topic_id
       WHERE l.id = $1`,
      [lesson_id]
    );

    if (lessonRes.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Referenced lesson does not exist' });
      return;
    }

    const topicId = lessonRes.rows[0].topic_id;

    const questionsRes = await query(
      `SELECT id, correct_option, points, difficulty_tag 
       FROM quiz_questions 
       WHERE lesson_id = $1`,
      [lesson_id]
    );

    const questionsMap = new Map<string, { correct_option: number; points: number }>();
    let totalPossibleScore = 0;

    questionsRes.rows.forEach((q) => {
      questionsMap.set(q.id, { correct_option: q.correct_option, points: q.points || 10 });
      totalPossibleScore += q.points || 10;
    });

    const totalQuestions = questionsRes.rows.length;

    // 2. Server-side score recomputation (Zero trust on client-submitted score)
    let serverComputedScore = 0;
    let correctAnswersCount = 0;
    const answerBreakdown: Array<{
      question_id: string;
      selected_option: number;
      correct_option: number;
      is_correct: boolean;
      points_earned: number;
    }> = [];

    (answers as SubmitAnswerItem[]).forEach((ans) => {
      const qData = questionsMap.get(ans.question_id);
      if (qData) {
        const isCorrect = qData.correct_option === ans.selected_option;
        const pointsEarned = isCorrect ? qData.points : 0;
        if (isCorrect) {
          correctAnswersCount++;
          serverComputedScore += pointsEarned;
        }
        answerBreakdown.push({
          question_id: ans.question_id,
          selected_option: ans.selected_option,
          correct_option: qData.correct_option,
          is_correct: isCorrect,
          points_earned: pointsEarned,
        });
      }
    });

    // 3. Idempotent Upsert on attempt_uuid
    const existingAttempt = await query(
      `SELECT id, attempt_uuid, server_computed_score FROM attempts WHERE attempt_uuid = $1`,
      [attempt_uuid]
    );

    const isDuplicate = existingAttempt.rows.length > 0;

    let attemptRow;
    if (isDuplicate) {
      // Safe no-op update on sync status/timestamp
      const updateRes = await query(
        `UPDATE attempts 
         SET synced_at = NOW(), status = 'synced'
         WHERE attempt_uuid = $1
         RETURNING *`,
        [attempt_uuid]
      );
      attemptRow = updateRes.rows[0];
    } else {
      const insertRes = await query(
        `INSERT INTO attempts 
          (attempt_uuid, student_id, lesson_id, answers, client_submitted_score, server_computed_score, total_questions, correct_answers, status, submitted_at, synced_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'synced', NOW(), NOW())
         RETURNING *`,
        [
          attempt_uuid,
          studentId,
          lesson_id,
          JSON.stringify(answers),
          client_submitted_score || 0,
          serverComputedScore,
          totalQuestions,
          correctAnswersCount,
        ]
      );
      attemptRow = insertRes.rows[0];
    }

    // 4. Recompute student topic progress
    const studentTopicAttempts = await query(
      `SELECT a.lesson_id, MAX(a.server_computed_score) as max_score, MAX(a.correct_answers) as max_correct, MAX(a.total_questions) as max_total
       FROM attempts a
       JOIN lessons l ON l.id = a.lesson_id
       WHERE a.student_id = $1 AND l.topic_id = $2
       GROUP BY a.lesson_id`,
      [studentId, topicId]
    );

    const topicLessonsCountRes = await query(
      `SELECT COUNT(*)::int as count FROM lessons WHERE topic_id = $1`,
      [topicId]
    );
    const totalTopicLessons = topicLessonsCountRes.rows[0].count || 1;
    const completedLessonsCount = studentTopicAttempts.rows.length;

    let topicTotalPoints = 0;
    studentTopicAttempts.rows.forEach((r) => {
      topicTotalPoints += parseInt(r.max_score, 10) || 0;
    });

    const masteryPercent = Math.min(
      100,
      Math.round((completedLessonsCount / totalTopicLessons) * 100)
    );

    await query(
      `INSERT INTO progress (student_id, topic_id, mastery_level, total_points, lessons_completed, last_activity_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (student_id, topic_id)
       DO UPDATE SET
         mastery_level = $3,
         total_points = $4,
         lessons_completed = $5,
         last_activity_at = NOW()`,
      [studentId, topicId, masteryPercent, topicTotalPoints, completedLessonsCount]
    );

    // 5. Evaluate and award Badges
    const newBadges: Array<{ id: string; name: string; nameOdia: string }> = [];

    // Badge 1: First Step in Science
    const allAttemptsCountRes = await query(
      `SELECT COUNT(*)::int as count FROM attempts WHERE student_id = $1`,
      [studentId]
    );
    if (allAttemptsCountRes.rows[0].count >= 1) {
      const badgeRes = await query(
        `INSERT INTO badges_earned (student_id, badge_id, badge_name, badge_name_odia, earned_at)
         VALUES ($1, 'first_step', 'First Step in Science', 'ପ୍ରଥମ ଶିକ୍ଷା ପଦକ୍ଷେପ', NOW())
         ON CONFLICT (student_id, badge_id) DO NOTHING
         RETURNING *`,
        [studentId]
      );
      if (badgeRes.rows.length > 0) {
        newBadges.push({
          id: 'first_step',
          name: 'First Step in Science',
          nameOdia: 'ପ୍ରଥମ ଶିକ୍ଷା ପଦକ୍ଷେପ',
        });
      }
    }

    // Badge 2: Perfect 100% Score
    if (totalQuestions > 0 && correctAnswersCount === totalQuestions) {
      const badgeRes = await query(
        `INSERT INTO badges_earned (student_id, badge_id, badge_name, badge_name_odia, earned_at)
         VALUES ($1, 'perfect_score', 'Perfect Score 100%', 'ଶତ ପ୍ରତିଶତ କୁଇଜ୍ ସ୍କୋର', NOW())
         ON CONFLICT (student_id, badge_id) DO NOTHING
         RETURNING *`,
        [studentId]
      );
      if (badgeRes.rows.length > 0) {
        newBadges.push({
          id: 'perfect_score',
          name: 'Perfect Score 100%',
          nameOdia: 'ଶତ ପ୍ରତିଶତ କୁଇଜ୍ ସ୍କୋର',
        });
      }
    }

    // Badge 3: STEM Explorer (Completed >= 3 distinct lessons)
    const distinctLessonsRes = await query(
      `SELECT COUNT(DISTINCT lesson_id)::int as count FROM attempts WHERE student_id = $1`,
      [studentId]
    );
    if (distinctLessonsRes.rows[0].count >= 3) {
      const badgeRes = await query(
        `INSERT INTO badges_earned (student_id, badge_id, badge_name, badge_name_odia, earned_at)
         VALUES ($1, 'stem_explorer', 'STEM Explorer', 'STEM ଅଭିଯାତ୍ରୀ', NOW())
         ON CONFLICT (student_id, badge_id) DO NOTHING
         RETURNING *`,
        [studentId]
      );
      if (badgeRes.rows.length > 0) {
        newBadges.push({
          id: 'stem_explorer',
          name: 'STEM Explorer',
          nameOdia: 'STEM ଅଭିଯାତ୍ରୀ',
        });
      }
    }

    // Badge 4: Quiz Champion (Total points >= 50)
    const totalPointsRes = await query(
      `SELECT COALESCE(SUM(total_points), 0)::int as total FROM progress WHERE student_id = $1`,
      [studentId]
    );
    if (totalPointsRes.rows[0].total >= 50) {
      const badgeRes = await query(
        `INSERT INTO badges_earned (student_id, badge_id, badge_name, badge_name_odia, earned_at)
         VALUES ($1, 'quiz_champion', 'Quiz Champion', 'କୁଇଜ୍ ଚାମ୍ପିଅନ୍', NOW())
         ON CONFLICT (student_id, badge_id) DO NOTHING
         RETURNING *`,
        [studentId]
      );
      if (badgeRes.rows.length > 0) {
        newBadges.push({
          id: 'quiz_champion',
          name: 'Quiz Champion',
          nameOdia: 'କୁଇଜ୍ ଚାମ୍ପିଅନ୍',
        });
      }
    }

    res.json({
      success: true,
      isDuplicate,
      attempt: attemptRow,
      score: serverComputedScore,
      totalPossibleScore,
      correctCount: correctAnswersCount,
      totalQuestions,
      answerBreakdown,
      newBadges,
      progress: {
        topicId,
        masteryPercent,
        completedLessonsCount,
        topicTotalPoints,
      },
    });
  } catch (err: any) {
    console.error('[submitAttempt Error]', err.message);
    res.status(500).json({ success: false, error: 'Failed to process attempt submission' });
  }
}

// GET /api/progress/me
export async function getProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ success: false, error: 'Unauthorized user' });
      return;
    }

    // 1. Topic-by-topic progress
    const progressRes = await query(
      `SELECT 
        p.topic_id,
        p.mastery_level,
        p.total_points,
        p.lessons_completed,
        p.last_activity_at,
        ct.subject,
        ct.grade,
        ct.topic_name,
        ct.topic_name_odia,
        COUNT(l.id)::int as total_topic_lessons
      FROM progress p
      JOIN content_topics ct ON ct.id = p.topic_id
      LEFT JOIN lessons l ON l.topic_id = ct.id
      WHERE p.student_id = $1
      GROUP BY p.id, ct.id
      ORDER BY p.last_activity_at DESC`,
      [studentId]
    );

    // 2. Badges earned
    const badgesRes = await query(
      `SELECT id, badge_id, badge_name, badge_name_odia, earned_at
       FROM badges_earned
       WHERE student_id = $1
       ORDER BY earned_at DESC`,
      [studentId]
    );

    // 3. Aggregate totals
    const totalPoints = progressRes.rows.reduce((sum, r) => sum + (parseInt(r.total_points, 10) || 0), 0);
    const distinctLessonsRes = await query(
      `SELECT COUNT(DISTINCT lesson_id)::int as count FROM attempts WHERE student_id = $1`,
      [studentId]
    );
    const totalCompletedLessons = distinctLessonsRes.rows[0].count || 0;

    res.json({
      success: true,
      stats: {
        totalPoints,
        totalCompletedLessons,
        badgesCount: badgesRes.rows.length,
      },
      topicProgress: progressRes.rows,
      badges: badgesRes.rows,
    });
  } catch (err: any) {
    console.error('[getProgress Error]', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch student progress' });
  }
}
