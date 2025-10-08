import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import defaultBackground from "../../../assets/image/defaultBackground.png"; 

export const WelcomeRoom = () => {
  const { t } = useTranslation();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${defaultBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center font-[Calistoga] text-6xl sm:text-7xl md:text-9xl lg:text-9xl leading-tight drop-shadow-lg mb-30"
      >
        {t("welcomeRoom.line1")}
        <br />
        {t("welcomeRoom.line2")}
        <br />
        {t("welcomeRoom.appName")}
      </motion.h1>
    </div>
  );
};
