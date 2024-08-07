import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utilities/generateToken.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, role: "user", password: hashedPassword });
    await newUser.save();
    const token = generateToken({
      name: newUser.name,
      email: newUser.email,
    });
    return res
      .cookie("token", token, COOKIE_OPTIONS)
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken({
      name: user.name,
      email: user.email,
    });
    return res
      .cookie("token", token, COOKIE_OPTIONS)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const check = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error occurred while checking user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .clearCookie("token", COOKIE_OPTIONS)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login, check, logout };
