import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "@/locales/en/common.json";
import faCommon from "@/locales/fa/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      fa: { common: faCommon },
    },
    lng: "en",
    fallbackLng: "fa",
    ns: ["common"],
    defaultNS: "common",
    debug: import.meta.env.DEV ? true : false,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    i18n.on("languageChanged", (lng) => {
      const dir = lng.startsWith("fa") ? "rtl" : "ltr";
      document.documentElement.dir = dir;
      document.documentElement.lang = lng;
      document.documentElement.classList.toggle("rtl", dir === "rtl");
    });
  });

export default i18n;
