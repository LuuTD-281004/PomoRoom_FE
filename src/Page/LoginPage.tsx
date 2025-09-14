import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import loginImage from "../assets/image/login.png";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password); // 🔥 call login from context
    } catch (err) {
      console.log(err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-screen flex flex-col items-center justify-center">
      <div className="flex flex-1 items-center justify-center mt-14">
        <div className="w-full h-[calc(100vh-80px)] grid grid-cols-2">
          {/* Cột trái */}
          <div className="flex flex-col justify-center px-20 bg-white">
            <h1 className="text-2xl font-bold mb-2 whitespace-nowrap">
              Chào mừng đến với PomoRoom
            </h1>
            <p className="text-gray-500 mb-6">
              Đăng nhập bằng tài khoản của bạn
            </p>

            <div className="flex flex-col gap-2">
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Mật Khẩu"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <br />
              <Button size="full" disabled={loading} onClick={handleLogin}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </div>

            <p className="text-sm text-gray-600 text-center mt-6">
              Bạn chưa có tài khoản ?{" "}
              <a
                href="/register"
                className="hover:underline"
                style={{ color: "#6AD5E8" }}
              >
                Đăng ký
              </a>
            </p>

            <br />
            <div className="w-full h-[1px] bg-[#0C1A57]" />
            <br />
            <p className="text-gray-500 mb-6">Phương thức đăng nhập khác</p>
          </div>

          {/* Cột phải */}
          <div className="flex items-center justify-end px-10 py-8">
            <img
              src={loginImage}
              alt="Login illustration"
              className="object-cover w-140 h-140 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
