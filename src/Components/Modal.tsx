import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ModalProps = {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  variant?: "default" | "light";
};

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  isOpen,
  className,
  variant = "default",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-[2px]",
            className
          )}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl shadow-lg relative overflow-hidden p-6 max-h-[90vh] w-[90%] sm:w-[1000px]"
            style={{
              backgroundColor: variant === "default" ? "#0C1A57" : "#97E5FF",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <span
              onClick={onClose}
              className={cn(
                "absolute top-3 left-4 text-2xl font-bold cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition",
                variant === "default"
                  ? "text-white hover:bg-white/20 hover:text-red-400"
                  : "text-black hover:bg-black/10 hover:text-red-600"
              )}
            >
              ×
            </span>

            {/* Title */}
            {variant === "default" ? (
              <h2 className="text-center text-white font-bold text-2xl mb-4">
                {title}
              </h2>
            ) : (
              <div className="w-full bg-[#75DDFF] py-3 text-center rounded-md mb-4">
                <h2 className="text-black font-bold text-xl">{title}</h2>
              </div>
            )}

            {/* Body with custom scrollbar */}
            <div
              className={cn(
                "h-[500px] overflow-y-auto px-2 pr-3 rounded-lg",
                variant === "default"
                  ? "text-white text-sm"
                  : "text-black text-base"
              )}
              style={{
                scrollbarWidth: "thin", // Firefox
                scrollbarColor:
                  variant === "default"
                    ? "rgba(255,255,255,0.3) transparent"
                    : "rgba(0,0,0,0.2) transparent",
              }}
            >
              <div />
              <style>
                {`
                  /* Tùy chỉnh scrollbar chỉ áp dụng trong modal này */
                  .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                  }
                  .custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 10px;
                  }
                  .custom-scroll::-webkit-scrollbar-thumb {
                    background: ${
                      variant === "default"
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(0,0,0,0.2)"
                    };
                    border-radius: 10px;
                    transition: background 0.2s;
                  }
                  .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: ${
                      variant === "default"
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(0,0,0,0.35)"
                    };
                  }
                `}
              </style>

              <div className="custom-scroll">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
