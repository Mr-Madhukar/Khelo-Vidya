import { Request, Response } from 'express';
import { query } from '../config/db.js';

// GET /api/topics
export async function getTopics(req: Request, res: Response): Promise<void> {
  try {
    const { grade, subject } = req.query;

    let sql = `
      SELECT 
        ct.id,
        ct.subject,
        ct.grade,
        ct.topic_name,
        ct.topic_name_odia,
        ct.order_index,
        COUNT(l.id)::int AS lesson_count
      FROM content_topics ct
      LEFT JOIN lessons l ON l.topic_id = ct.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (grade) {
      params.push(parseInt(grade as string, 10));
      sql += ` AND ct.grade = $${params.length}`;
    }

    if (subject) {
      params.push(subject as string);
      sql += ` AND ct.subject ILIKE $${params.length}`;
    }

    sql += ` GROUP BY ct.id ORDER BY ct.order_index ASC, ct.grade ASC`;

    const result = await query(sql, params);
    res.json({ success: true, topics: result.rows });
  } catch (err: any) {
    console.error('[getTopics Error]', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch topics' });
  }
}

// GET /api/lessons
export async function getLessons(req: Request, res: Response): Promise<void> {
  try {
    const { topic_id, grade, subject } = req.query;

    let sql = `
      SELECT 
        l.id,
        l.topic_id,
        l.title,
        l.title_odia,
        l.content_version,
        l.language,
        l.content_body,
        l.media_refs,
        l.created_at,
        ct.subject,
        ct.grade,
        ct.topic_name,
        ct.topic_name_odia,
        COUNT(qq.id)::int AS question_count
      FROM lessons l
      JOIN content_topics ct ON ct.id = l.topic_id
      LEFT JOIN quiz_questions qq ON qq.lesson_id = l.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (topic_id) {
      params.push(topic_id as string);
      sql += ` AND l.topic_id = $${params.length}`;
    }

    if (grade) {
      params.push(parseInt(grade as string, 10));
      sql += ` AND ct.grade = $${params.length}`;
    }

    if (subject) {
      params.push(subject as string);
      sql += ` AND ct.subject ILIKE $${params.length}`;
    }

    sql += ` GROUP BY l.id, ct.id ORDER BY ct.order_index ASC, l.title ASC`;

    const result = await query(sql, params);
    res.json({ success: true, lessons: result.rows });
  } catch (err: any) {
    console.error('[getLessons Error]', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch lessons' });
  }
}

// GET /api/lessons/:id
export async function getLessonById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const lessonResult = await query(
      `SELECT 
        l.id,
        l.topic_id,
        l.title,
        l.title_odia,
        l.content_version,
        l.language,
        l.content_body,
        l.media_refs,
        l.created_at,
        ct.subject,
        ct.grade,
        ct.topic_name,
        ct.topic_name_odia
      FROM lessons l
      JOIN content_topics ct ON ct.id = l.topic_id
      WHERE l.id = $1`,
      [id]
    );

    if (lessonResult.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }

    const questionsResult = await query(
      `SELECT 
        id,
        lesson_id,
        question_text,
        question_text_odia,
        options,
        options_odia,
        correct_option,
        difficulty_tag,
        points,
        order_index
      FROM quiz_questions
      WHERE lesson_id = $1
      ORDER BY order_index ASC`,
      [id]
    );

    const lesson = lessonResult.rows[0];
    lesson.questions = questionsResult.rows;

    res.json({ success: true, lesson });
  } catch (err: any) {
    console.error('[getLessonById Error]', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch lesson details' });
  }
}
