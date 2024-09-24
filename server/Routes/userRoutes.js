import express from "express";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// Get all users
router.get("/all-users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select("-password"); // Exclude the password field

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "users found", users: users });
  } catch (err) {
    console.log("error:", err.message);
    res
      .status(500)
      .json({ message: "Backend: Error fetching users", error: err });
  }
});

// Register new user
router.post("/register", async (req, res) => {
  const { username, age, gender, number, email, password } = req.body;
  try {
    // Check for existing user by email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check for existing user by name
    const existingName = await User.findOne({ username });
    if (existingName) {
      return res.status(400).json({ message: "User Name already registered" });
    }

    // Check if age is 18 or older
    if (age < 18) {
      return res
        .status(400)
        .json({ message: "You must be at least 18 years old to register" });
    }

    // Generate a slug from the name (example)
    const slug = username.toLowerCase().replace(/ /g, "_");

    // Create new user
    const user = new User({
      username,
      age,
      gender,
      number,
      email,
      password,
      slug: username.toLowerCase().replace(/ /g, "_"),
    });

    await user.save();

    // Prepare user data without password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userObj,
    });
  } catch (err) {
    console.log("error:", err.message);
    res
      .status(500)
      .json({ message: "backend: Error registering user", error: err });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust token expiration as needed
    });

    // Prepare user data without password
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ token, user: userObj, message: "Login successful" });
  } catch (err) {
    console.log("error:", err.message);
    res.status(500).json({ message: "Backend: Error logging in", error: err });
  }
});

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Check if user has entered the contest
export const checkContestEntry = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.hasEnteredContest) {
      return res
        .status(400)
        .json({ message: "User has already entered the contest" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking contest entry" });
  }
};

export default router;
