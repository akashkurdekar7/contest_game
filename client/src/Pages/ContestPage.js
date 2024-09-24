import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import GameCard from "../Components/GameCard"; // Create a GameCard component for individual game cards
import { useGameCompletion } from "./../Contexts/GameHandlerContext";

const games = [
  { id: 1, title: "Trivia Champion" },
  { id: 2, title: "Number Guessing" },
  { id: 3, title: "Math Genius" },
  { id: 4, title: "Memory Match" },
  { id: 5, title: "Puzzle Master" },
];

const ContestPage = () => {
  const { completedGames } = useGameCompletion();
  const navigate = useNavigate();

  const handleStartGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <Layout>
      <div>
        <h1>Available Games</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              completed={completedGames.includes(game.id)}
              onGameStart={() => handleStartGame(game.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContestPage;
