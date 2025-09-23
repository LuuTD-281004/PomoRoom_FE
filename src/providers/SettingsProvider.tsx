import { useEffect, useState } from "react";
import http from "../axios/http";
import { SettingsContext } from "@/contexts/SettingsContext";
import type { Settings } from "@/types/settings";

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settingsData, setSettingsData] = useState<Settings | null>(null);

  const fetchSettingsData = async () => {
    const response = await http.get("/settings");
    setSettingsData(response.data.settings);
  };

  useEffect(() => {
    fetchSettingsData();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings: settingsData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
