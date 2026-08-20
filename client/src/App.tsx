import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

const LandingPage = React.lazy(() => import('./pages/LandingPage.tsx').then((m) => ({ default: m.LandingPage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage.tsx').then((m) => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage.tsx').then((m) => ({ default: m.RegisterPage })));
const DashboardHome = React.lazy(() => import('./pages/DashboardHome.tsx').then((m) => ({ default: m.DashboardHome })));
const LessonCatalogPage = React.lazy(() => import('./pages/LessonCatalogPage.tsx').then((m) => ({ default: m.LessonCatalogPage })));
const LessonDetailPage = React.lazy(() => import('./pages/LessonDetailPage.tsx').then((m) => ({ default: m.LessonDetailPage })));
const QuizPage = React.lazy(() => import('./pages/QuizPage.tsx').then((m) => ({ default: m.QuizPage })));
const ProgressPage = React.lazy(() => import('./pages/ProgressPage.tsx').then((m) => ({ default: m.ProgressPage })));
const PhotosynthesisGamePage = React.lazy(() => import('./features/stem-game/PhotosynthesisGame.tsx').then((m) => ({ default: m.PhotosynthesisGamePage })));

const PageLoader: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid rgba(96, 165, 250, 0.2)',
          borderTopColor: '#60a5fa',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 12px',
        }}
      />
      <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Loading / ଲୋଡ୍ ହେଉଛି...</p>
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Landing & Demo Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/demo" element={<PhotosynthesisGamePage />} />
              <Route path="/adventure/:topicKey" element={<PhotosynthesisGamePage />} />
              <Route path="/adventure/photosynthesis" element={<PhotosynthesisGamePage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Student / Teacher Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/lessons" element={<LessonCatalogPage />} />
                <Route path="/lessons/:id" element={<LessonDetailPage />} />
                <Route path="/lessons/:id/quiz" element={<QuizPage />} />
                <Route path="/lessons/:id/adventure" element={<PhotosynthesisGamePage />} />
                <Route path="/progress" element={<ProgressPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

