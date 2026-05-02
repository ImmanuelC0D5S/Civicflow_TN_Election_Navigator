import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/organisms/Navbar';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatBot } from './components/molecules/ChatBot';

// Lazy loaded components for code splitting
const Home = lazy(() => import('./components/pages/Home').then(m => ({ default: m.Home })));
const Timeline = lazy(() => import('./components/pages/Timeline').then(m => ({ default: m.Timeline })));
const Registration = lazy(() => import('./components/pages/Registration').then(m => ({ default: m.Registration })));
const PollingLocator = lazy(() => import('./components/pages/PollingLocator').then(m => ({ default: m.PollingLocator })));
const LearningHub = lazy(() => import('./components/pages/LearningHub').then(m => ({ default: m.LearningHub })));
const Dashboard = lazy(() => import('./components/pages/Dashboard').then(m => ({ default: m.Dashboard })));

// Loading skeleton
const PageLoader = () => (
  <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id'}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <ProgressProvider>
              <Router>
                <div className="min-h-screen bg-background flex flex-col font-sans transition-colors duration-300 text-text-primary">
                  <Navbar />
                  <main className="flex-grow">
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/timeline" element={<Timeline />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/locator" element={<PollingLocator />} />
                        <Route path="/learn" element={<LearningHub />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <footer className="bg-surface-low border-t border-white/5 mt-auto">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-text-muted">
                      <p>&copy; {new Date().getFullYear()} CivicFlow TN. Midnight Sovereign Framework.</p>
                      <p className="mt-2 uppercase tracking-widest">Non-partisan • Educational • Secure</p>
                    </div>
                  </footer>
                  <ChatBot />
                </div>
              </Router>
            </ProgressProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
