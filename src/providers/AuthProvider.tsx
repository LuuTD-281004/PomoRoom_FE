import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import http from "../axios/http";
import { userLogin, userRegister } from "@/axios/auth";
import { getUserInfo } from "@/axios/user";
import type { UserType } from "@/types/user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const setUserFunction = async () => {
    const user = await getUserInfo();
    setCurrentUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessTokenState(token);
      setUserFunction();
    }
  }, [accessTokenState]);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await userRegister(username, email, password);
      if (response.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await userLogin(email, password);
      const { accessToken } = response.data.authResult.cookies;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginWithGoogle = async (googleResponse: any) => {
    try {
      const response = await http.post("/auth/google/callback", {
        code: googleResponse.credential,
      });

      const { accessToken } = response.data.authResult.cookies;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      setAccessTokenState(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        loginWithGoogle,
        register,
        logout,
        authenticatedUser: currentUser,
        accessToken: accessTokenState,
        currentRoleUsing: currentRole,
        setCurrentRoleUsing: setCurrentRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
