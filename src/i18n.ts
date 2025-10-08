import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import vi from "./locales/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: "vi", // Ngôn ngữ mặc định
  fallbackLng: "en", // fallback nếu không tìm thấy key
  interpolation: {
    escapeValue: false, // React đã tự chống XSS
  },
});

export default i18n;
