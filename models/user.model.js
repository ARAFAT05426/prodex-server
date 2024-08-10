import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    default: ""
  },
  profilePicture: {
    type: String,
    default: "https://img.freepik.com/premium-photo/3d-computer-desktop-showing-alert-error-404-text-accept-success-concept-3d-render_696265-456.jpg?w=1380",
  },
  bio: {
    type: String,
    maxlength: 750,
    default: ""
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    github: String,
  },
  accountStatus: {
    type: String,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
const User = mongoose.model("User", userSchema);
export default User;
