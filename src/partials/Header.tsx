import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="mx-auto flex items-center gap-2 px-6 py-3">
        <img
          src="../src/assets/image/logo.png"
          alt="logo"
          className="h-16 w-16 object-contain"
        />

        <h1
          style={{ fontFamily: "'Calistoga', cursive", fontSize: "2rem" }}
          className="font-bold text-[#0C1A57] mt-3"
        >
          PomoRoom
        </h1>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
