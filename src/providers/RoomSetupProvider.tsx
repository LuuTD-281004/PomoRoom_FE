import { RoomContext, type RoomSetup } from "@/contexts/RoomSetupContext";
import React, { useState } from "react";

const defaultSetup: RoomSetup = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 10,
};

export const RoomSetupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [setup, setSetupState] = useState<RoomSetup>(defaultSetup);

  const setSetup = (patch: Partial<RoomSetup>) =>
    setSetupState((prev) => ({ ...prev, ...patch }));

  return (
    <RoomContext.Provider value={{ setup, setSetup }}>
      {children}
    </RoomContext.Provider>
  );
};