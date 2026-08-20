import { Router } from 'express';
import { submitAttempt, getProgress, getClassSummary } from '../controllers/attemptController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Protected attempt submission & progress endpoints
router.post('/', authenticateToken, submitAttempt);
router.get('/progress/me', authenticateToken, getProgress);
router.get('/me', authenticateToken, getProgress);
router.get('/class-summary', authenticateToken, getClassSummary);
router.get('/teacher/overview', authenticateToken, getClassSummary);

export default router;
