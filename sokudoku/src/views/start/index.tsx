import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import MotionButton from "../../components/buttons/MotionButton"; // Adjust the import path as needed

const Start: React.FC = () => {
  const navigate = useNavigate();
  const [showNewButtons, setShowNewButtons] = useState(false);

  const handleStartGame = useCallback(() => {
    setShowNewButtons(true);
    // Navigate to '/start' after animation if needed
  }, []);

  const handleSetting = useCallback(() => {
    navigate("/setting");
  }, [navigate]);

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  const newButtons = [
    { label: "Option 1", onClick: () => {} },
    { label: "Option 2", onClick: () => {} },
    { label: "Option 3", onClick: () => {} },
    { label: "Option 4", onClick: () => {} },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Sokudoku
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {!showNewButtons ? (
          <>
            <MotionButton
              onClick={handleStartGame}
              className="bg-blue-500"
              variants={buttonVariants}
            >
              Start Game
            </MotionButton>
            <MotionButton
              onClick={handleSetting}
              className="bg-green-500"
              variants={buttonVariants}
            >
              Setting
            </MotionButton>
          </>
        ) : (
          newButtons.map((button, index) => (
            <MotionButton
              key={index}
              onClick={button.onClick}
              className="bg-purple-500"
              custom={index}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
                exit: { y: 50, opacity: 0, transition: { duration: 0.5 } },
              }}
            >
              {button.label}
            </MotionButton>
          ))
        )}
      </div>
    </div>
  );
};

export default Start;
