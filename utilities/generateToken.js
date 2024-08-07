import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;
if (!secret) {
  console.log(secret);
  throw new error("env error");
}
export const generateToken = (userInfo, options = {}) => {
  if (!userInfo || typeof userInfo !== "object") {
    throw new Error("Invalid user information provided.");
  }
  try {
    const token = jwt.sign({ ...userInfo }, secret, {
      expiresIn: "7d",
      ...options,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token.");
  }
};
