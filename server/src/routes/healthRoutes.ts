import { Router, Request, Response } from 'express';
import { pool } from '../config/db.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  let dbStatus = 'disconnected';
  try {
    const dbRes = await pool.query('SELECT 1 as connected');
    if (dbRes.rows.length > 0) {
      dbStatus = 'connected';
    }
  } catch (err: any) {
    dbStatus = `unavailable (${err.message})`;
  }

  res.json({
    status: 'ok',
    app: 'Khelo Vidya Backend API',
    version: '1.0.0',
    phase: 'Phase 0 (Foundation)',
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
});

export default router;
