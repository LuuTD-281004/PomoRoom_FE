import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import defaultBackground from "../assets/image/defaultBackground.png"; // dùng nền giống LoginPage
import Header from "../partials/Header";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError(t("error_password_mismatch"));
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
    } catch (err: any) {
      console.log(err);
      setError(t("error_register_failed"));
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
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-2 text-[#0C1A57]">
            {t("register_title")}
          </h1>
          <p className="text-gray-600 mb-6">{t("register_subtitle")}</p>

          <div className="flex flex-col gap-3 text-left">
            <Input
              label={t("username")}
              placeholder={t("username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              label={t("email")}
              type="email"
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

            <Input
              label={t("confirm_password")}
              type="password"
              placeholder={t("confirm_password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="text-center mt-4">
              <Button size="full" disabled={loading} onClick={handleRegister}>
                {loading ? t("registering") : t("register")}
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            {t("have_account")}{" "}
            <a
              href="/login"
              className="text-[#6AD5E8] hover:underline italic font-medium"
            >
              {t("login")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
