import { createContext, useContext } from "react";
import type { Settings } from "@/types/settings";

interface SettingContextType {
  settings: Settings | null;
}

export const SettingsContext = createContext<SettingContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
