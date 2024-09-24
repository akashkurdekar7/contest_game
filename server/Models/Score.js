import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, required: true },
    gameNumber: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", scoreSchema);
export default Score;
