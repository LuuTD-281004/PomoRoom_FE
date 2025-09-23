import React from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./../Components/Button";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

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

        <div className="flex items-center gap-4">
          {/* Nút chuyển ngôn ngữ */}
          <div
            onClick={toggleLanguage}
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12"
          >
            <ReactCountryFlag
              countryCode={i18n.language === "vi" ? "VN" : "US"}
              svg
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Nút đăng nhập, ẩn nếu đang ở /login */}
          {!isAuthPage && (
            <Button onClick={() => navigate("/login")}>Đăng nhập</Button>
          )}
        </div>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
