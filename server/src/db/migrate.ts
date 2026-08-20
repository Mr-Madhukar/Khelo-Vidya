import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  console.log('[Migration] Starting database migration...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(schemaSql);

    // Check if default schools exist, if not seed default demo schools
    const schoolCheck = await client.query('SELECT COUNT(*) FROM schools');
    if (parseInt(schoolCheck.rows[0].count, 10) === 0) {
      console.log('[Migration] Seeding initial Odisha government schools...');
      await client.query(`
        INSERT INTO schools (name, udise_code, district)
        VALUES 
          ('Govt. High School, Khordha', '21170100101', 'Khordha'),
          ('Biju Patnaik High School, Ganjam', '21190200302', 'Ganjam'),
          ('Mayurbhanj Tribal Model School, Baripada', '21070300403', 'Mayurbhanj'),
          ('Kalahandi Model Vidyalaya, Bhawanipatna', '21260400504', 'Kalahandi')
      `);
    }

    await client.query('COMMIT');
    console.log('[Migration] Migrations applied successfully!');
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('[Migration] Migration failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

// Auto-run if executed directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
