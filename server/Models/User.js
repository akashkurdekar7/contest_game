import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  slug: {
    type: String,
    default: function () {
      return this.username.toLowerCase().replace(/ /g, "_");
    },
  },
  age: { type: Number, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others"],
  },
  number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
  hasEnteredContest: { type: Boolean, default: false },
});

// Hash password and generate slug before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Generate slug
  if (this.isModified("username")) {
    this.slug = this.username.toLowerCase().replace(/ /g, "_");
  }

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
