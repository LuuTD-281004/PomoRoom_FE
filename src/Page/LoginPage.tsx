import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import loginImage from "../assets/image/login.png";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div>
      <div className="flex flex-1 items-center justify-center mt-14">
        <div className="w-full h-[calc(100vh-80px)] grid grid-cols-2">
          {/* Cột trái */}
          <div className="flex flex-col justify-center px-20 bg-white">
            <h1 className="text-2xl font-bold mb-2 whitespace-nowrap">
              Chào mừng đến với PomoRoom
            </h1>
            <p className="text-gray-500 mb-6">Đăng nhập bằng tài khoản của bạn</p>

            <form onSubmit={handleRegister} className="flex flex-col gap-2">
              <Input
                label="Tên đăng nhập"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              
              <Input
                label="Mật Khẩu"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <br />
              <Button type="submit" size="full">
                Đăng nhập
              </Button>
            </form>

            <p className="text-sm text-gray-600 text-center mt-6">
              Bạn chưa có tài khoản ?{" "}
              <a
                href="/login"
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
              alt="Register illustration"
              className="object-cover w-140 h-140 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
