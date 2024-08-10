import express from "express";
import { check, login, logout, signup, update } from "../controllers/auth.controllers.js";
import verifyToken from "../utilities/verifyToken.js";
const app = express.Router();

app.post("/signup", signup);

app.post("/login", login);

app.get("/check", verifyToken, check);

app.put("/update", verifyToken, update);

app.post("/logout", logout);

export { app as authroute };
