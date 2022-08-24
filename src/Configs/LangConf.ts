import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "En",
  resources: {
    En: {
      translation: {
        // GLOBAL
        // Main SideBar
        "Home": "Home",
        "Search": "Search",
        "Genres": "Genres",
        "History": "History",
        "NewPl": "New Playlist",
        "SaveLib": "Media Library",
        "Settings": "Settings",
      }
    },
    Ua: {
      translation: {
        // GLOBAL
        // Main SideBar
        "Home": "Основна",
        "Search": "Пошук",
        "Genres": "Жанри",
        "History": "Історія",
        "NewPl": "Нов. плейліст",
        "SaveLib": "Медіа тека",
        "Settings": "Налаштування",
      }
    },
  },
  keySeparator: false,
  interpolation: { escapeValue: false }
});

export default i18n;