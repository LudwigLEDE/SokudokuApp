import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import MotionButton from "../../components/buttons/MotionButton";

const Start: React.FC = () => {
  const navigate = useNavigate();
  const [showNewButtons, setShowNewButtons] = useState(false);
  const [exitButton, setExitButton] = useState<string | null>(null);

  const handleStartGame = useCallback(() => {
    setShowNewButtons(true);
  }, []);

  const handleSetting = useCallback(() => {
    setExitButton("setting");
    setTimeout(() => {
      navigate("/setting");
    }, 500); // Match this with the exit transition duration
  }, [navigate]);

  const handleDifficultySelect = useCallback(
    (difficulty: string) => {
      setExitButton(difficulty);
      setTimeout(() => {
        navigate(`/game/${difficulty}`);
      }, 500); // Match this with the exit transition duration
    },
    [navigate]
  );

  const handleBack = useCallback(() => {
    setShowNewButtons(false);
  }, []);

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };

  const newButtons = [
    { label: "Easy", onClick: () => handleDifficultySelect("easy") },
    { label: "Medium", onClick: () => handleDifficultySelect("medium") },
    { label: "Hard", onClick: () => handleDifficultySelect("hard") },
    { label: "Very Hard", onClick: () => handleDifficultySelect("very-hard") },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Sokudoku
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {!showNewButtons ? (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={buttonVariants}
            >
              <MotionButton
                onClick={handleStartGame}
                className="bg-blue-500"
                variants={buttonVariants}
              >
                Start Game
              </MotionButton>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={buttonVariants}
            >
              <MotionButton
                onClick={handleSetting}
                className="bg-green-500"
                variants={buttonVariants}
              >
                Setting
              </MotionButton>
            </motion.div>
          </>
        ) : (
          <>
            {newButtons.map((button, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                exit={exitButton === button.label?.toLowerCase() ? "exit" : ""}
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
                <MotionButton
                  onClick={button.onClick ?? (() => {})}
                  className="bg-purple-500"
                  custom={index}
                  variants={buttonVariants}
                >
                  {button.label ?? "Button"}
                </MotionButton>
              </motion.div>
            ))}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Start;
