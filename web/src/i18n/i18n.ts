import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import esTranslations from './es.json';
import ruTranslations from './ru.json';
import roTranslations from './ro.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      ru: {
        translation: ruTranslations
      },
      ro: {
        translation: roTranslations
      }
    },
    lng: 'ro', // Set Romanian as default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;