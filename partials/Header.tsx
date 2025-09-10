import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="mx-auto flex items-center gap-6 px-6 py-6">
        {/* Logo */}
        <img src="../src/assets/image/logo.png" alt="logo" className="h-32 w-32 object-contain" />

        {/* Text */}
        <h1
          style={{ fontFamily: "'Calistoga', cursive", fontSize: "5rem" }}
          className="font-bold text-[#0C1A57] mt-4"
        >
          PomoRoom
        </h1>
      </div>

      <div className="w-full h-[5px] bg-[#0C1A57]" />
    </header>
  );
};

export default Header;
