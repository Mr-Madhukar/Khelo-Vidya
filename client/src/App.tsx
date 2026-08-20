import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { DashboardHome } from './pages/DashboardHome.tsx';
import { LessonCatalogPage } from './pages/LessonCatalogPage.tsx';
import { LessonDetailPage } from './pages/LessonDetailPage.tsx';
import { QuizPage } from './pages/QuizPage.tsx';
import { ProgressPage } from './pages/ProgressPage.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { PhotosynthesisGamePage } from './features/stem-game/PhotosynthesisGame.tsx';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
