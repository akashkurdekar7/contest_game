import React, { useState, useEffect } from "react";
import Button from "../Components/Button";

const TriviaGame = ({ onGameComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Simulate fetching trivia questions
    const triviaQuestions = [
      { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: 1 },
      {
        question: "Capital of France?",
        answers: ["Berlin", "Paris", "Rome"],
        correct: 1,
      },
      {
        question: "What is the largest planet?",
        answers: ["Earth", "Mars", "Jupiter"],
        correct: 2,
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "William Shakespeare", "Mark Twain"],
        correct: 1,
      },
      {
        question: "What is the boiling point of water?",
        answers: ["100°C", "90°C", "120°C"],
        correct: 0,
      },
    ];
    setQuestions(triviaQuestions);
  }, []);

  const handleAnswer = (answerIndex) => {
    let updatedScore = score;
    if (answerIndex === questions[currentQuestion].correct) {
      updatedScore += 10; // Increment score locally
      setScore(updatedScore); // Update the state with the new score
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      onGameComplete(1, updatedScore, timeTaken); // Use the updated score
    }
  };

  return (
    <div>
      <h2>Trivia Game</h2>
      {questions.length > 0 ? (
        <div>
          <p>{questions[currentQuestion].question}</p>
          {questions[currentQuestion].answers.map((answer, idx) => (
            <Button key={idx} onClick={() => handleAnswer(idx)}>
              {answer}
            </Button>
          ))}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default TriviaGame;
