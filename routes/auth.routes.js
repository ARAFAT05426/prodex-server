import express from "express";
import { logout, setToken } from "../controllers/auth.controllers.js";
const app = express.Router();

app.post("/token", setToken);

app.post("/logout", logout);

export { app as authroute };
