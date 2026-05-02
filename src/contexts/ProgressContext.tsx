import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import type { UserProgress } from '../types/election.types';

interface ProgressContextType {
  progress: UserProgress | null;
  loading: boolean;
  markModuleCompleted: (moduleId: string) => void;
  updateQuizScore: (quizId: string, score: number) => void;
  setRegistrationStatus: (status: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // For non-logged in users, use local storage
      const stored = localStorage.getItem('election_progress');
      if (stored) {
        setProgress(JSON.parse(stored));
      } else {
        setProgress({
          userId: 'anonymous',
          completedModules: [],
          quizScores: {},
          lastVisited: new Date(),
          registered: false
        });
      }
      setLoading(false);
      return;
    }

    // For logged in users, sync with Firestore
    const progressDoc = doc(db, 'users', user.uid, 'data', 'progress');
    
    const unsubscribe = onSnapshot(progressDoc, (docSnap) => {
      if (docSnap.exists()) {
        setProgress(docSnap.data() as UserProgress);
      } else {
        const initialProgress = {
          userId: user.uid,
          completedModules: [],
          quizScores: {},
          lastVisited: new Date(),
          registered: false
        };
        setProgress(initialProgress);
        setDoc(progressDoc, initialProgress);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveProgress = async (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('election_progress', JSON.stringify(newProgress));

    if (user) {
      const progressDoc = doc(db, 'users', user.uid, 'data', 'progress');
      await setDoc(progressDoc, newProgress);
    }
  };

  const markModuleCompleted = (moduleId: string) => {
    if (!progress) return;
    const newProgress = {
      ...progress,
      completedModules: Array.from(new Set([...progress.completedModules, moduleId]))
    };
    saveProgress(newProgress);
  };

  const updateQuizScore = (quizId: string, score: number) => {
    if (!progress) return;
    const newProgress = {
      ...progress,
      quizScores: { ...progress.quizScores, [quizId]: score }
    };
    saveProgress(newProgress);
  };

  const setRegistrationStatus = (status: boolean) => {
    if (!progress) return;
    const newProgress = { ...progress, registered: status };
    saveProgress(newProgress);
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, markModuleCompleted, updateQuizScore, setRegistrationStatus }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
