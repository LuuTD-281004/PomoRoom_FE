import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const WelcomeRoom = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-170px)] bg-blue-200">
      <motion.h1
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-center font-[Calistoga] text-6xl sm:text-7xl md:text-9xl lg:text-9xl text-white leading-tight"
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
