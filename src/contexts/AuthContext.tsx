import { createContext, useContext } from "react";
import type { UserTokenData } from "../types/token";

interface AuthContextType {
  loginWithGoogle: (googleResponse: any) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  register: (username: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  authenticatedUser: UserTokenData | null;
  accessToken: string | null;
  currentRoleUsing: string | null;
  setCurrentRoleUsing: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
