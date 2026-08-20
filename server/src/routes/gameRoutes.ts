import { Router } from 'express';
import { getGameProgress, saveGameProgress } from '../controllers/gameController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Game progress endpoints
router.get('/:topicKey/progress', authenticateToken, getGameProgress);
router.post('/progress', authenticateToken, saveGameProgress);

export default router;
