import { Router } from 'express';
import { getTopics, getLessons, getLessonById } from '../controllers/lessonController.js';

const router = Router();

// Public / cached content routes
router.get('/topics', getTopics);
router.get('/', getLessons);
router.get('/:id', getLessonById);

export default router;
