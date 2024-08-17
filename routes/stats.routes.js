import express from "express";
import { getStats } from "../controllers/stats.controller.js";
const app = express.Router();

app.get("/:email", getStats)

export { app as statRoute };
