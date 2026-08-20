import { Response } from 'express';
import { query } from '../config/db.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

// GET /api/game/:topicKey/progress
export async function getGameProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ success: false, error: 'Unauthorized user' });
      return;
    }

    const { topicKey } = req.params;

    const result = await query(
      `SELECT id, student_id, lesson_id, current_level, xp, score, difficulty, plant_stage, completed, updated_at
       FROM lesson_progress
       WHERE student_id = $1 AND lesson_id = $2`,
      [studentId, topicKey]
    );

    if (result.rows.length === 0) {
      // Default initial state
      res.json({
        success: true,
        progress: {
          lessonId: topicKey,
          currentLevel: 1,
          maxUnlockedLevel: 1,
          xp: 0,
          score: 0,
          difficulty: 'medium',
          plantStage: 'seed',
          completed: false,
          badges: [],
        },
      });
      return;
    }

    const row = result.rows[0];

    // Fetch earned badges for this student
    const badgesRes = await query(
      `SELECT badge_id FROM badges_earned WHERE student_id = $1`,
      [studentId]
    );
    const badges = badgesRes.rows.map((b) => b.badge_id);

    res.json({
      success: true,
      progress: {
        id: row.id,
        lessonId: row.lesson_id,
        currentLevel: row.current_level,
        maxUnlockedLevel: Math.max(row.current_level, 1),
        xp: row.xp,
        score: row.score,
        difficulty: row.difficulty,
        plantStage: row.plant_stage,
        completed: row.completed,
        updatedAt: row.updated_at,
        badges,
      },
    });
  } catch (err: unknown) {
    console.error('[getGameProgress Error]', err instanceof Error ? err.message : err);
    res.status(500).json({ success: false, error: 'Failed to fetch game progress' });
  }
}

// POST /api/game/progress
export async function saveGameProgress(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ success: false, error: 'Unauthorized user' });
      return;
    }

    const { lessonId, currentLevel, xp, score, difficulty, plantStage, completed, newBadges } = req.body;

    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Missing required field: lessonId' });
      return;
    }

    const safeLevel = currentLevel || 1;
    const safeXp = xp || 0;
    const safeScore = score || 0;
    const safeDifficulty = difficulty || 'medium';
    const safeStage = plantStage || 'seed';
    const safeCompleted = Boolean(completed);

    const upsertRes = await query(
      `INSERT INTO lesson_progress (student_id, lesson_id, current_level, xp, score, difficulty, plant_stage, completed, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (student_id, lesson_id)
       DO UPDATE SET
         current_level = GREATEST(lesson_progress.current_level, $3),
         xp = GREATEST(lesson_progress.xp, $4),
         score = GREATEST(lesson_progress.score, $5),
         difficulty = $6,
         plant_stage = $7,
         completed = lesson_progress.completed OR $8,
         updated_at = NOW()
       RETURNING *`,
      [studentId, lessonId, safeLevel, safeXp, safeScore, safeDifficulty, safeStage, safeCompleted]
    );

    // Save newly unlocked badges if any
    const awardedBadges: string[] = [];
    if (Array.isArray(newBadges) && newBadges.length > 0) {
      for (const badge of newBadges) {
        const badgeId = typeof badge === 'string' ? badge : badge.id;
        const badgeName = typeof badge === 'object' ? badge.name : badgeId;
        const badgeNameOdia = typeof badge === 'object' ? badge.nameOdia : null;

        await query(
          `INSERT INTO badges_earned (student_id, badge_id, badge_name, badge_name_odia, earned_at)
           VALUES ($1, $2, $3, $4, NOW())
           ON CONFLICT (student_id, badge_id) DO NOTHING`,
          [studentId, badgeId, badgeName, badgeNameOdia]
        );
        awardedBadges.push(badgeId);
      }
    }

    res.json({
      success: true,
      progress: upsertRes.rows[0],
      awardedBadges,
    });
  } catch (err: unknown) {
    console.error('[saveGameProgress Error]', err instanceof Error ? err.message : err);
    res.status(500).json({ success: false, error: 'Failed to save game progress' });
  }
}
