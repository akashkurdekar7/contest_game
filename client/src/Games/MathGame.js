import React, { useState } from "react";
import styled from "styled-components";

const MathGame = ({ onGameComplete }) => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const questionLimit = 5;
  const [startTime] = useState(Date.now());

  const handleSubmit = () => {
    if (parseInt(userAnswer) === num1 + num2) {
      setScore((prev) => prev + 10); // Increment score
    }

    const updatedQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(updatedQuestionsAnswered);

    // If the limit is reached, call onGameComplete
    if (updatedQuestionsAnswered >= questionLimit) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime; // Calculate time taken
      onGameComplete(3, score, timeTaken); // Pass the final score
    } else {
      // Generate new question
      setNum1(Math.floor(Math.random() * 10));
      setNum2(Math.floor(Math.random() * 10));
    }
    setUserAnswer("");
  };

  return (
    <Container>
      <h2>Math Game</h2>
      <p>
        What is {num1} + {num2}?
      </p>
      <Input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <p>Score: {score}</p>
      <p>
        Questions Answered: {questionsAnswered}/{questionLimit}
      </p>
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

export default MathGame;
