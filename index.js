import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utilities/connectDB.js";
import { usersroute } from "./routes/users.routes.js";
import { authroute } from "./routes/auth.routes.js";
import { productRoute } from "./routes/products.routes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Define routes
app.use("/auth", authroute);

app.use("/users", usersroute);

app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.status(200).json("prodex-server");
});

// Error handling for 404 - Not Found
app.use((req, res, next) => {
  res.status(404).json("Not Found");
});

// Error handling for server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
