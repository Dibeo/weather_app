import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Charge les traductions depuis des fichiers public
  .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Langue par défaut si aucune n'est détectée
    debug: false, // Active les logs pour le débogage
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/lang/{{lng}}/{{ns}}.json',
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
