import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './en';
import * as ko from './ko';

const resources: Resource = {
  'en-US': {
    ...en
  },
  'ko-KR': {
    ...ko
  }
} as const;
// @ts.ignore
i18n.use(initReactI18next).init({
  resources,
  lng: 'ko-KR', // 초기 설정 언어
  fallbackLng: {
    'en-US': ['en-US'],
    default: ['ko-KR']
  },
  debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
}).then().catch(()=>window.alert("에러"));

export default i18n;