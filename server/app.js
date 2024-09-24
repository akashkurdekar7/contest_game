import express from "express";
import http from "http";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import gameRoutes from "./Routes/gameRoutes.js";
import dbconn from "./Database/dbconn.js"; // Import the MongoDB connection
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
dbconn();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.json("hiii server");
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.post("/logout", (req, res) => {
  // Clear the token on the client side
  res.status(200).json({ message: "Logged out successfully" });
  window.refresh;
});

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => console.log(`Server running on port ${PORT}🔥`));
