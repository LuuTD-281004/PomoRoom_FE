import React from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img
            src="../src/assets/image/logo.png"
            alt="logo"
            className="h-16 w-16 object-contain"
          />
          <h1
            style={{ fontFamily: "'Calistoga', cursive", fontSize: "2rem" }}
            className="font-bold text-[#0C1A57] mt-3"
          >
            PomoRoom
          </h1>
        </div>

        <button onClick={toggleLanguage} className="text-2xl">
          {i18n.language === "vi" ? "🇻🇳" : "🇺🇸"}
        </button>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
