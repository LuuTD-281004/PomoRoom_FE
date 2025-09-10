import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "default" | "wide" | "full";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  size = "default",
  className = "",
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 text-white shadow-md transform";

  const gradient =
    "bg-gradient-to-b from-[#6AD5E8] to-[#458895] hover:from-[#76DEEF] hover:to-[#357076] hover:brightness-110 hover:scale-105 disabled:brightness-90 disabled:cursor-not-allowed";

  const sizeStyle = {
    default: "w-auto min-w-[120px]",
    wide: "w-auto min-w-[160px]",
    full: "w-full",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${gradient} ${sizeStyle[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
