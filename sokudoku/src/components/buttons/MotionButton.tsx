import React from "react";
import { motion, Variants } from "framer-motion";

interface MotionButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  custom?: number;
  variants: Variants;
}

const MotionButton: React.FC<MotionButtonProps> = ({
  onClick,
  className = "",
  children,
  custom,
  variants,
}) => (
  <motion.button
    onClick={onClick}
    className={`w-40 h-12 px-6 py-2 text-white rounded hover:bg-opacity-90 transition-colors duration-300 ${className}`}
    custom={custom}
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.button>
);

export default MotionButton;
