import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Configuration des traductions locales pour différentes langues
i18n
  .use(initReactI18next) // connecte i18next à React
  .init({
    fallbackLng: "fr", // langue par défaut si la langue actuelle n'est pas trouvée
    lng: "fr", // langue initiale
    debug: true, // permet de voir les logs dans la console
    interpolation: {
      escapeValue: false, // éviter l'échappement des variables
    },
    react: {
      useSuspense: false, // pas de suspense avec les traductions
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          description: "This is the English version.",
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          description: "Ceci est la version française.",
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido",
          description: "Esta es la versión en español.",
        },
      },
    },
  });

export default i18n;
