import React from "react";
import { useLocation } from "react-router-dom";

const GameComplete = () => {
  const location = useLocation();
  const { totalScore, totalTime } = location.state || {};

  return (
    <div>
      <h2>Game Complete</h2>
      <p>Your Total Score: {totalScore}</p>
      <p>Total Time Taken: {Math.floor(totalTime / 1000)} seconds</p>
    </div>
  );
};

export default GameComplete;
