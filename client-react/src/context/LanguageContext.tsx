import React, { createContext, useContext, useState, useEffect } from 'react';

type LangType = 'en' | 'ar';

interface LanguageContextType {
  language: LangType;
  setLanguage: (lang: LangType) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<LangType>(() => {
    // 1. Check LocalStorage (User preference persists)
    const saved = localStorage.getItem('app_lang') as LangType | null;
    if (saved) return saved;

    // 2. Check Browser Language (Auto-detect)
    // In Vite CSR, window/navigator is always available
    const browserLang = navigator.language || navigator.languages[0];
    if (browserLang && browserLang.startsWith('ar')) {
      return 'ar';
    }

    // 3. Default
    return 'en';
  });

  const setLanguage = (lang: LangType) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // Effect: Update the HTML tag globally
  // This ensures Tailwind CSS flips margins/padding/flex-direction automatically
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};