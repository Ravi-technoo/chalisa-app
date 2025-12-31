import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsHi from './locales/hi.json';
import translationsEn from './locales/en.json';

i18n.use(initReactI18next).init({
  resources: {
    hi: { translation: translationsHi },
    en: { translation: translationsEn },
  },
  lng: localStorage.getItem('language') || 'hi',
  fallbackLng: 'hi',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
