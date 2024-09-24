import React, { useState } from "react";

const NumberGuessingGame = ({ onGameComplete }) => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Generates a number between 1 and 100
  }

  const handleGuess = () => {
    const numericGuess = Number(guess);
    setAttempts(attempts + 1);
    if (numericGuess === randomNumber) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      onGameComplete(10 - attempts, timeTaken); // Score based on remaining attempts
      setMessage("Congratulations! You guessed the number!");
    } else if (numericGuess < randomNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
    setGuess("");
  };

  return (
    <div>
      <h2>Number Guessing Game</h2>
      <p>Guess a number between 1 and 100:</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        min="1"
        max="100"
      />
      <button onClick={handleGuess}>Submit Guess</button>
      {message && <p>{message}</p>}
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default NumberGuessingGame;
