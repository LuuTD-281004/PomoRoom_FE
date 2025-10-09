import React from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./../Components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { UserDropdown } from "@/Components/UserDropdown";
import logo from "../assets/image/logo.png";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-6 py-3">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={navigateToHome}
        >
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 object-contain"
          />
          <h1
            style={{ fontFamily: "'Calistoga', cursive", fontSize: "1.5rem" }}
            className="font-bold text-[#0C1A57] mt-2"
          >
            PomoRoom
          </h1>
        </div>

        <div className="flex items-center gap-4">
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

          {authenticatedUser ? (
            <>
              <UserDropdown user={authenticatedUser} />
            </>
          ) : (
            <>
              {!isAuthPage && (
                <Button onClick={() => navigate("/login")}>
                  {t("login")}
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
