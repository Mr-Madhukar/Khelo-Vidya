import { Router } from 'express';
import { submitAttempt, getProgress } from '../controllers/attemptController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Protected attempt submission & progress endpoints
router.post('/', authenticateToken, submitAttempt);
router.get('/progress/me', authenticateToken, getProgress);

export default router;
