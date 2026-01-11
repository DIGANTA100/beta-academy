import { useState, useEffect } from 'react';

type Language = 'en' | 'bn';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get saved language from localStorage
    const saved = localStorage.getItem('beta-academy-language') as Language;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang: Language = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    localStorage.setItem('beta-academy-language', newLang);
  };

  const setLang = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('beta-academy-language', lang);
  };

  return { language, toggleLanguage, setLanguage: setLang };
};
