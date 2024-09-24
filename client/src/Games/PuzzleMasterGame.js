import React, { useState } from "react";
import styled from "styled-components";

const initialTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

const PuzzleMasterGame = ({ onGameComplete }) => {
  const [tiles, setTiles] = useState(
    initialTiles.sort(() => Math.random() - 0.5)
  );
  const [moves, setMoves] = useState(0);
  const [startTime] = useState(Date.now());

  const isSolved = () => JSON.stringify(tiles) === JSON.stringify(initialTiles);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1,
      emptyIndex + 1,
      emptyIndex - 3,
      emptyIndex + 3,
    ];

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = tiles[index];
      newTiles[index] = null;
      setTiles(newTiles);
      setMoves((prev) => prev + 1);
    }

    if (isSolved()) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      onGameComplete(4, moves, timeTaken); // Game completed
    }
  };

  return (
    <div>
      <h2>Puzzle Master</h2>
      <p>Solve the puzzle by sliding the tiles!</p>
      <PuzzleGrid>
        {tiles.map((tile, index) => (
          <Tile key={index} onClick={() => moveTile(index)}>
            {tile}
          </Tile>
        ))}
      </PuzzleGrid>
      <p>Moves: {moves}</p>
      {isSolved() && <p>Congratulations! You solved the puzzle!</p>}
    </div>
  );
};

const PuzzleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;
`;

const Tile = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  cursor: pointer;
`;

export default PuzzleMasterGame;
