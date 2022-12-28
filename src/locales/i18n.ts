import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/main.json';
import translationKo from './ko/main.json';

const resource = {
  en: {
    translation: translationEn
  },
  kr: {
    translation: translationKo
  }
};

void i18n.use(initReactI18next).init({
  resources: resource,
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;
