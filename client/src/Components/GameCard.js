import React from "react";
import styled from "styled-components";
import Button from "./Button";

const GameCard = ({ game, completed, onGameStart }) => {
  const startGame = () => {
    if (!completed) {
      onGameStart(game.id); // Ensure this passes the correct game ID
    }
  };

  return (
    <Card completed={completed}>
      <h3>{game.title}</h3>
      <p>{completed ? "Completed" : "Not Completed"}</p>
      <Button onClick={startGame} disabled={completed}>
        {completed ? "Game Completed" : "Start Game"}
      </Button>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid white;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
  background-color: ${(props) =>
    props.completed ? "#d3ffd3" : "#fff"}; // Conditional background color
`;

export default GameCard;
