import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { STRINGS } from '../lib/constants';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('civicflow_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ta')) {
      return saved;
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('civicflow_lang', lang);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = STRINGS[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to English if Tamil string is missing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallback: any = STRINGS['en'];
        for (const fbKey of keys) {
          if (!fallback[fbKey]) return keyPath;
          fallback = fallback[fbKey];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
