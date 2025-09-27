import { createContext, useContext } from "react";

export type RoomSetup = {
    focusMinutes: number;
    shortBreakMinutes: number;
    longBreakMinutes: number;
};

type ContextType = {
    setup: RoomSetup;
    setSetup: (patch: Partial<RoomSetup>) => void;
};

export const RoomContext = createContext<ContextType | undefined>(undefined);

export function useRoomSetup() {
    const context = useContext(RoomContext);
    if (!context) throw new Error("useRoomSetup must be used within RoomSetupProvider");
    return context;
}