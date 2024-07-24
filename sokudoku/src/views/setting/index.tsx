import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import MotionButton from "../../components/buttons/MotionButton";

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const [exitButton, setExitButton] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("palette1");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleChangePalette = useCallback((palette: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(palette);
      setIsTransitioning(false);
    }, 500); // Shortened transition duration
  }, []);

  const handleBack = useCallback(() => {
    setExitButton("back");
    setTimeout(() => {
      navigate("/start");
    }, 500); // Match this with the exit transition duration
  }, [navigate]);

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }, // Shortened duration
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }, // Shortened duration
  };

  const palettes = [
    { name: "palette1", color: "bg-palette1-primary" },
    { name: "palette2", color: "bg-palette2-primary" },
    { name: "palette3", color: "bg-palette3-primary" },
    { name: "palette4", color: "bg-palette4-primary" },
    { name: "palette5", color: "bg-palette5-primary" },
    { name: "palette6", color: "bg-palette6-primary" },
    { name: "palette7", color: "bg-palette7-primary" },
    { name: "palette8", color: "bg-palette8-primary" },
    { name: "palette9", color: "bg-palette9-primary" },
    { name: "palette10", color: "bg-palette10-primary" },
  ];

  return (
    <div
      data-theme={theme}
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Shortened duration
        />
      )}
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Settings
      </h1>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {palettes.map((palette, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            exit={exitButton === palette.name ? "exit" : ""}
            variants={buttonVariants}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => handleChangePalette(palette.name)}
              className={`w-16 h-16 rounded-full ${palette.color}`}
            ></button>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit={exitButton === "back" ? "exit" : ""}
        variants={buttonVariants}
      >
        <MotionButton
          onClick={handleBack}
          className="bg-red-500"
          variants={buttonVariants}
        >
          Back
        </MotionButton>
      </motion.div>
    </div>
  );
};

export default Setting;
