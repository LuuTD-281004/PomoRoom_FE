import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "default" | "wide" | "full";
  color?: "gradient" | "gray";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  size = "default",
  color = "gradient", 
  className = "",
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md transform";

  const colors = {
    gradient:
      "text-white bg-gradient-to-b from-[#6AD5E8] to-[#458895] hover:from-[#76DEEF] hover:to-[#357076]",
    gray: "bg-[#D9D9D9] text-[#0669E2] hover:brightness-95",
  };

  const disabledStyle =
    "opacity-60 cursor-not-allowed hover:scale-100 hover:brightness-100";

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
      className={`${baseStyle} ${colors[color]} ${sizeStyle[size]} ${
        disabled ? disabledStyle : "hover:scale-105"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
