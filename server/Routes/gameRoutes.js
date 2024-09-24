import express from "express";
import Game from "../Models/Game.js";
import User from "../Models/User.js";
import { checkContestEntry } from "./userRoutes.js";
import Score from "../Models/Score.js";

const router = express.Router();

// Start a new game
router.post("/start", checkContestEntry, async (req, res) => {
  console.log("Starting new game with body:", req.body);
  const { slug, gameNumber } = req.body;
  try {
    const user = await User.findOne({ slug });

    if (!user) {
      console.error("User not found with slug:", slug);
      return res.status(404).json({ message: "User not found" });
    }

    const game = new Game({
      userId: user._id,
      gameNumber,
      startTime: new Date(),
    });

    await game.save();
    user.hasEnteredContest = true;
    await user.save();

    res.status(200).json({ message: "Game started", gameId: game._id });
  } catch (err) {
    console.error("Error starting game:", err);
    res.status(500).json({ message: "Error starting game" });
  }
});

// Submit game results
router.post("/submit", async (req, res) => {
  // console.log("req body: ", req.body);
  const { slug, gameNumber, score, timeTaken } = req.body;

  if (!slug || !gameNumber || score === undefined || timeTaken === undefined) {
    console.error("Missing required fields in request body");
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ slug });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a new score entry
    const newScore = new Score({
      userId: user._id,
      score,
      gameNumber,
      timeTaken,
    });

    await newScore.save();

    user.totalScore += score; // Assuming you have totalScore field in User model
    user.totalTime += timeTaken; // Assuming you have totalTime field in User model
    await user.save();

    res.status(200).json({
      message: "Game results submitted successfully",
      score: newScore,
    });
  } catch (err) {
    console.error("Error in /submit: ", err);
    res.status(500).json({ message: "Error submitting game results" });
  }
});

// Retrieve scores from database
router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find()
      .populate("userId", "slug totalScore")
      .sort({ score: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scores", error });
  }
});

export default router;
