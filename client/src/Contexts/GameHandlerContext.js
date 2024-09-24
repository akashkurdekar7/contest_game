import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create Game Completion Context
const GameCompletionContext = createContext();

// Provide the context to children
export const GameCompletionProvider = ({ children }) => {
  const [completedGames, setCompletedGames] = useState(() => {
    // Load completed games from local storage
    const savedGames = localStorage.getItem("completedGames");
    return savedGames ? JSON.parse(savedGames) : [];
  });

  const resetGames = () => {
    setCompletedGames([]); // Reset the completed games state
    localStorage.removeItem("completedGames"); // Clear from local storage
  };

  const handleGameCompletion = async (gameId, score, timeTaken) => {
    console.log("Game ID to submit:", gameId);
    try {
      const slug = localStorage.getItem("slug"); // Get the username
      console.log("slug from localStorage: ", slug); // Debugging log
      if (!slug) {
        throw new Error("User not logged in.");
      }

      const response = await axios.post(
        "http://localhost:5000/api/game/submit",
        {
          slug,
          gameNumber: gameId,
          score,
          timeTaken,
        }
      );

      console.log("response from the server: ", response?.data);
      toast.success("Game results submitted successfully!");

      // Mark game as completed
      setCompletedGames((prev) => {
        const updatedGames = [...prev, gameId];
        localStorage.setItem("completedGames", JSON.stringify(updatedGames)); // Save to local storage
        return updatedGames;
      });
    } catch (error) {
      console.error("Error submitting game results:", error);
      toast.error("Error in submitting game completion. || error in context");
    }
  };

  return (
    <GameCompletionContext.Provider
      value={{ handleGameCompletion, completedGames, resetGames }}
    >
      {children}
    </GameCompletionContext.Provider>
  );
};

// Custom hook to use the GameCompletion context
export const useGameCompletion = () => useContext(GameCompletionContext);
