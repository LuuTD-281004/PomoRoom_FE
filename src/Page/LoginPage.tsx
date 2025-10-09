import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import defaultBackground from "../assets/image/defaultBackground.png";
import Header from "../partials/Header";
import { GoogleLogin } from "@react-oauth/google"

const LoginPage: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useTranslation();

  const handleGoogleLogin = async (response: any) => {
    await loginWithGoogle(response);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError(t("error_required"));
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      console.log(err);
      setError(t("error_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <Header />

      <div
        className="flex-1 flex items-center justify-center bg-cover bg-center bg-no-repeat mt-15"
        style={{
          backgroundImage: `url(${defaultBackground})`,
        }}
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#0C1A57]">
            {t("welcome")}
          </h1>
          <p className="text-gray-600 mb-6">{t("login_with_account")}</p>

          <div className="flex flex-col gap-3 text-left">
            <Input
              label={t("email")}
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label={t("password")}
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="text-center">
              <Button size="full" disabled={loading} onClick={handleLogin}>
                {loading ? t("logging_in") : t("login")}
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            {t("no_account")}{" "}
            <a
              href="/register"
              className="text-[#6AD5E8] hover:underline italic font-medium"
            >
              {t("register")}
            </a>
          </p>

          <div className="my-6 w-full h-[1px] bg-[#0C1A57]/30" />

          <p className="text-gray-500 mb-4">{t("other_login")}</p>
          <GoogleLogin text="continue_with" onSuccess={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
