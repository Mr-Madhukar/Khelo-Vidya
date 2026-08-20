import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import attemptRoutes from './routes/attemptRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all during dev; configure specific origins for prod
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Request logging middleware
app.use((req, _res, next) => {
  if (ENV.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Routes with /api prefix
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/topics', lessonRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/progress', attemptRoutes);
app.use('/api/game', gameRoutes);

// Also mount routes without /api prefix for resiliency and flexible reverse proxies
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);
app.use('/topics', lessonRoutes);
app.use('/attempts', attemptRoutes);
app.use('/progress', attemptRoutes);
app.use('/game', gameRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Khelo Vidya API — ଖେଳ ବିଦ୍ୟା (SIH25048)',
    status: 'operational',
    docs: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        schools: 'GET /api/auth/schools'
      }
    }
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Start listening
app.listen(ENV.PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Khelo Vidya Server running on port ${ENV.PORT}`);
  console.log(`🌍 Environment: ${ENV.NODE_ENV}`);
  console.log(`📡 Health endpoint: http://localhost:${ENV.PORT}/api/health`);
  console.log(`=========================================`);
});

export default app;
