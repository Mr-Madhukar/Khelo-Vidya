import { Router } from 'express';
import { register, login, getMe, getSchools } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken as any, getMe as any);
router.get('/schools', getSchools);

export default router;
