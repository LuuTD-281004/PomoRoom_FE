import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ModalProps = {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({ title, children, onClose, isOpen, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={cn("fixed inset-0 flex items-center justify-center bg-black/30 z-50", className)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl p-6 shadow-lg relative"
            style={{ backgroundColor: "#0C1A57" }}
          >
            <span
              onClick={onClose}
              className="absolute top-3 right-4 text-white text-xl cursor-pointer hover:opacity-80"
            >
              ×
            </span>

            <h2 className="text-center text-white font-bold text-2xl mb-4">
              {title}
            </h2>

            <div className="text-white text-sm">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
