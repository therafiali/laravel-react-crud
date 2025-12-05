import React, { createContext, useContext, useState, useEffect } from "react";

type LangType = "en" | "ar";

interface LanguageContextType {
  language: LangType;
  setLanguage: (lang: LangType) => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<LangType>(() => {
    const saved = localStorage.getItem("app_lang") as LangType | null;
    if (saved) return saved;

    const browserLang = navigator.language || navigator.languages[0];
    if (browserLang && browserLang.startsWith("ar")) {
      return "ar";
    }

    return "en";
  });

  const setLanguage = (lang: LangType) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

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
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
