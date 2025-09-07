import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full max-w-md mx-auto p-4">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`border rounded-lg px-3 py-2 w-full outline-none pr-10 transition
            ${error ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:text-gray-700 transition-colors"
            style={{ 
              background: 'none',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer'
            }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};


export default Input;