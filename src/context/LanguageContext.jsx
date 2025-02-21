import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: {
    name: 'English',
    code: 'en',
    flag: '🇺🇸'
  },
  vi: {
    name: 'Tiếng Việt',
    code: 'vi',
    flag: '🇻🇳'
  },
  ja: {
    name: '日本語',
    code: 'ja',
    flag: '🇯🇵'
  },
  zh: {
    name: '中文',
    code: 'zh',
    flag: '🇨🇳'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('chatLanguage');
    return saved ? saved : 'en';
  });

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('chatLanguage', langCode);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);