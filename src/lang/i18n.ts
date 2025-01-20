import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "fr", 
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
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
