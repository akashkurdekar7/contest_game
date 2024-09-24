import React, { useState } from "react";
import styled from "styled-components";

const GuessTheNumberGame = ({ onGameComplete }) => {
  const [randomNumber] = useState(generateRandomNumber());
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
      onGameComplete(3 - attempts, timeTaken); // Score based on remaining attempts
      setMessage("Congratulations! You guessed the number!");
    } else if (numericGuess < randomNumber) {
      setMessage("Too low! Try again.");
    } else {
      setMessage("Too high! Try again.");
    }
    setGuess("");
  };

  return (
    <Container>
      <h2>Guess the Number Game</h2>
      <p>Guess a number between 1 and 100:</p>
      <Input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        min="1"
        max="100"
      />
      <Button onClick={handleGuess}>Submit Guess</Button>
      {message && <Message>{message}</Message>}
      <p>Attempts: {attempts}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Message = styled.p`
  font-weight: bold;
`;

export default GuessTheNumberGame;
