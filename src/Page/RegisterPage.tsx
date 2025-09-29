import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import registerImage from "../assets/image/login.png";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

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
    <div className="w-full min-w-screen bg-white flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center bg-white justify-center mt-14">
        <div className="w-full h-[calc(100vh-80px)] grid grid-cols-2">
          <div className="flex flex-col justify-center px-20 bg-white">
            <h1 className="text-2xl font-bold mb-2 mt-4">
              {t("register_title")}
            </h1>
            <p className="text-gray-500 mb-6">{t("register_subtitle")}</p>

            <div className="flex flex-col gap-2">
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

              <br />
              <Button size="full" disabled={loading} onClick={handleRegister}>
                {loading ? t("registering") : t("register")}
              </Button>
            </div>

            <p className="text-sm text-gray-600 text-center mt-6">
              {t("have_account")}{" "}
              <a
                href="/login"
                className="hover:underline"
                style={{ color: "#6AD5E8" }}
              >
                {t("login")}
              </a>
            </p>
          </div>

          <div className="flex items-center bg-white justify-end px-10 py-8">
            <img
              src={registerImage}
              alt="Register illustration"
              className="object-cover w-140 h-140 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
