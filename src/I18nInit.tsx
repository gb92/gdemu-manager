import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export default function I18nInit() {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng: "en",
      fallbackLng: "en",
      resources: {
        en: {
          default: {
            title: "Hello",
            "gdemu-sdcard-manager": "This is a different string",
          },
        },
      },
      interpolation: {
        escapeValue: false,
      },
    });
}
