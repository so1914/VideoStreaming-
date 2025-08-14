import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import frTranslations from '../locales/fr.json';
import trTranslations from '../locales/tr.json';
import bnTranslations from '../locales/bn.json';
import paTranslations from '../locales/pa.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState(enTranslations);

  const languageFiles = {
    en: enTranslations,
    hi: hiTranslations,
    fr: frTranslations,
    tr: trTranslations,
    bn: bnTranslations,
    pa: paTranslations
  };

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    setTranslations(languageFiles[savedLanguage]);
  }, []);

  const changeLanguage = (languageCode) => {
    if (languageFiles[languageCode]) {
      setCurrentLanguage(languageCode);
      setTranslations(languageFiles[languageCode]);
      localStorage.setItem('language', languageCode);
    }
  };

  const t = (key) => {
    return translations[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
