/* eslint-disable prettier/prettier */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from '../src/public/locales/en/translation.json';
import translationRO from '../src/public/locales/ro/translation.json';
import translationRU from '../src/public/locales/ru/translation.json';

// Define the resources object with translations
const resources = {
  en: {
    translation: translationEN,
  },
  ro: {
    translation: translationRO,
  },
  ru: {
    translation: translationRU,
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'ro', // Default language if user's language not found
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
