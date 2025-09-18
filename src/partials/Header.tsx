import React from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

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
        
        <div
          onClick={toggleLanguage}
          className="cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12"
        >
          <ReactCountryFlag
            countryCode={i18n.language === "vi" ? "VN" : "US"}
            svg
            style={{
              width: "28px",   // tăng một chút cho rõ
              height: "28px",
              borderRadius: "50%", // cho cờ tròn
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
