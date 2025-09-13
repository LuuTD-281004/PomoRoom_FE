import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import registerImage from "../assets/image/login.png";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoading(true);
      await register(username, email, password);
    } catch (err: any) {
      console.log(err);
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-1 items-center justify-center mt-14">
        <div className="w-full h-[calc(100vh-80px)] grid grid-cols-2">
          <div className="flex flex-col justify-center px-20 bg-white">
            <h1 className="text-2xl font-bold mb-2 whitespace-nowrap">
              Đăng ký tài khoản PomoRoom
            </h1>
            <p className="text-gray-500 mb-6">Tạo tài khoản của bạn</p>
            <div className="flex flex-col gap-2">
              <Input
                label="Tên tài khoản"
                placeholder="Tên tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label="Email"
                type="email"
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

              <Input
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <br />
              <Button
                size="full"
                disabled={loading}
                onClick={() => handleRegister()} 
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>
            </div>

            <p className="text-sm text-gray-600 text-center mt-6">
              Bạn đã có tài khoản ?{" "}
              <a
                href="/login"
                className="hover:underline"
                style={{ color: "#6AD5E8" }}
              >
                Đăng nhập
              </a>
            </p>
          </div>

          {/* Cột phải */}
          <div className="flex items-center justify-end px-10 py-8">
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
