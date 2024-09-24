import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import TriviaGame from "../Games/TriviaGame";
import MathGame from "../Games/MathGame";
import PuzzleMasterGame from "./../Games/PuzzleMasterGame";
import { useGameCompletion } from "./../Contexts/GameHandlerContext";
import NumberGuessingGame from "../Games/NumberGuessingGame";
import GuessTheNumberGame from "../Games/GuessTheNumberGame";

const GamePage = () => {
  const { handleGameCompletion } = useGameCompletion();
  const { gameId } = useParams();
  const navigate = useNavigate();

  const onGameComplete = (gameId, score, timeTaken) => {
    handleGameCompletion(gameId, score, timeTaken);
    // Navigate after completion
    setTimeout(() => {
      navigate("/contests"); // Adjust the path as necessary
    }, 2000); // Redirect after 2 seconds
  };

  const renderGame = () => {
    switch (parseInt(gameId)) {
      case 1:
        return <TriviaGame onGameComplete={onGameComplete} />;
      case 2:
        return <NumberGuessingGame onGameComplete={onGameComplete} />;
      case 3:
        return <MathGame onGameComplete={onGameComplete} />;
      case 4:
        return <GuessTheNumberGame onGameComplete={onGameComplete} />;
      case 5:
        return <PuzzleMasterGame onGameComplete={onGameComplete} />;
      default:
        return <p>Game not found</p>;
    }
  };

  return (
    <Layout>
      <div>{renderGame()}</div>
    </Layout>
  );
};

export default GamePage;
