import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  status: {
    type: String,
    default: "active",
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  }
});
const User = mongoose.model("User", userSchema);
export default User;
