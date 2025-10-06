import React from "react";
import { useTranslation } from "react-i18next";

interface FooterProps {
  facebookLink?: string;
  instagramLink?: string;
  tiktokLink?: string;
  phone?: string;
  email?: string;
  location?: string;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { t } = useTranslation();

  const {
    facebookLink = "https://www.facebook.com/people/Pomoroom/61581370064797/",
    tiktokLink = "https://www.tiktok.com/@pomoroom2025?_t=ZS-90KLKzkIZkn&_r=1",
    phone = "0368870665",
    email = "insyncpomo@gmail.com",
    location = "Hồ Chí Minh - Việt Nam"
  } = props;

  return (
    <footer className="w-full bg-[#0C1A57] text-white py-5 px-4 z-40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-12">
          
          <div className="flex flex-col items-center xl:items-start gap-4">
            <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-center xl:text-left">
              {t("footer.contact_us")}
            </h3>
            
            <div className="flex gap-4 lg:gap-5">
              <a 
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href={tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center xl:items-end gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="text-base lg:text-lg xl:text-xl font-medium">{phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span className="text-base lg:text-lg xl:text-xl font-medium">{email}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div className="flex items-center gap-2">
                <span className="text-base lg:text-lg xl:text-xl font-medium">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-4 pt-3 text-center">
          <p className="text-xs lg:text-sm opacity-75">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;