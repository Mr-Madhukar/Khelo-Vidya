import pg, { QueryResultRow } from 'pg';
import { ENV } from './env.js';
import { inMemDB } from './mockDb.js';

const { Pool } = pg;

const isRemoteDb = ENV.DATABASE_URL.includes('neon.tech') || 
                     ENV.DATABASE_URL.includes('sslmode=require') || 
                     ENV.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: isRemoteDb ? { rejectUnauthorized: false } : false,
});

let postgresAvailable = true;

pool.on('error', (err) => {
  if (postgresAvailable) {
    console.warn('[PostgreSQL] Connection unavailable, falling back to In-Memory Dev Store:', err.message);
    postgresAvailable = false;
  }
});

export const query = async <T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult<T>> => {
  const start = Date.now();

  if (postgresAvailable) {
    try {
      const res = await pool.query<T>(text, params);
      const duration = Date.now() - start;
      if (ENV.NODE_ENV === 'development') {
        console.log('[DB Query - PG]', { text: text.slice(0, 80), duration: `${duration}ms`, rows: res.rowCount });
      }
      return res;
    } catch (err: unknown) {
      const dbErr = err as { code?: string; message?: string };
      if (dbErr.code === 'ECONNREFUSED' || dbErr.code === 'ENOTFOUND' || dbErr.message?.includes('ECONNREFUSED')) {
        if (postgresAvailable) {
          console.warn('⚠️ [PostgreSQL daemon offline]. Falling back seamlessly to In-Memory Educational Store.');
          postgresAvailable = false;
        }
      } else {
        console.error('[DB Query Error]', { text, error: dbErr.message });
        throw err;
      }
    }
  }

  // In-memory fallback
  const res = inMemDB.query(text, params);
  const duration = Date.now() - start;
  if (ENV.NODE_ENV === 'development') {
    console.log('[DB Query - InMem]', { text: text.slice(0, 80), duration: `${duration}ms`, rows: res.rowCount });
  }
  return res as pg.QueryResult<T>;
};

