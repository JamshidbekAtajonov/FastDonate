import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/global.json";
import translationRU from "./locales/ru/global.json";
import translationUZ from "./locales/uz/global.json";

const resources = {
  en: {
    translation: translationEN,
  },
  uz: {
    translation: translationUZ,
  },
  ru: {
    translation: translationRU,
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "uz", // Default language
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
