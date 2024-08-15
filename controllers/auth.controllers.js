import { generateToken } from "../utilities/generateToken.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const setToken = async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res.status(401).json({ message: "user is required" });
    }
    const token = generateToken(user);
    return res
      .cookie("token", token, COOKIE_OPTIONS)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          email: user.email,
        },
      });
  } catch (error) {
    console.error("Login error:", error.message);
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

export { setToken, logout };
