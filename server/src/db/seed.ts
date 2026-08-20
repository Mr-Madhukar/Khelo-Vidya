import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';
import { runMigrations } from './migrate.js';
import { SEED_DATA } from './seedData.js';

export { SEED_DATA };

export async function seedDatabase() {
  console.log('[Seed] Ensuring migrations are applied...');
  await runMigrations();

  const client = await pool.connect();
  try {
    console.log('[Seed] Beginning STEM curriculum seeding...');
    await client.query('BEGIN');

    // Clean existing seed content topics to ensure fresh seed
    await client.query('DELETE FROM content_topics');

    let totalLessonsCount = 0;
    let totalQuestionsCount = 0;

    for (const topicData of SEED_DATA) {
      const topicRes = await client.query(
        `INSERT INTO content_topics (subject, grade, topic_name, topic_name_odia, order_index)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [
          topicData.subject,
          topicData.grade,
          topicData.topic_name,
          topicData.topic_name_odia,
          topicData.order_index
        ]
      );
      const topicId = topicRes.rows[0].id;

      for (const lessonData of topicData.lessons) {
        totalLessonsCount++;
        const lessonRes = await client.query(
          `INSERT INTO lessons (topic_id, title, title_odia, content_version, language, content_body, media_refs)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id`,
          [
            topicId,
            lessonData.title,
            lessonData.title_odia,
            lessonData.content_version,
            lessonData.language,
            JSON.stringify(lessonData.content_body),
            JSON.stringify(lessonData.media_refs)
          ]
        );
        const lessonId = lessonRes.rows[0].id;

        let qIndex = 0;
        for (const q of lessonData.questions) {
          totalQuestionsCount++;
          qIndex++;
          await client.query(
            `INSERT INTO quiz_questions 
             (lesson_id, question_text, question_text_odia, options, options_odia, correct_option, difficulty_tag, points, order_index)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              lessonId,
              q.question_text,
              q.question_text_odia,
              JSON.stringify(q.options),
              JSON.stringify(q.options_odia),
              q.correct_option,
              q.difficulty_tag,
              q.points,
              qIndex
            ]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log(`[Seed] Successfully seeded ${SEED_DATA.length} topics, ${totalLessonsCount} lessons, and ${totalQuestionsCount} questions!`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[Seed] Seeding failed:', err instanceof Error ? err.message : err);
    throw err;
  } finally {
    client.release();
  }
}

// Auto-run if executed directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDatabase()
    .then(() => {
      console.log('[Seed] Database populated successfully!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed] Error:', err);
      process.exit(1);
    });
}
