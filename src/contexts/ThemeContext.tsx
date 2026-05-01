import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark-hc';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const saved = localStorage.getItem('civicflow_theme') as ThemeMode;
    if (saved) {
      setTheme(saved);
      if (saved === 'dark-hc') {
        document.documentElement.classList.add('dark', 'hc');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark-hc' : 'light';
    setTheme(newTheme);
    localStorage.setItem('civicflow_theme', newTheme);
    
    if (newTheme === 'dark-hc') {
      document.documentElement.classList.add('dark', 'hc');
    } else {
      document.documentElement.classList.remove('dark', 'hc');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
