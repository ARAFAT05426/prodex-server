import { connectDB } from "./utilities/connectDB.js";
import { authroute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const PORT = process.env.PORT;

app.use("/auth", authroute);
app.get("/", async (req, res) => {
  res.status(200).send("server-template");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
