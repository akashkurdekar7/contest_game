import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameNumber: { type: Number, required: true },
  score: { type: Number, default: 0 },
  startTime: { type: Date },
  endTime: { type: Date },
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
