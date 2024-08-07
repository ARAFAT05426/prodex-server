import {
  addUser,
  getUsers,
  updateUser,
} from "../controllers/users.controller.js";
import express from "express";
const app = express.Router();

app.get("/", getUsers);

app.post("/add", addUser);

app.patch("/update", updateUser);

export { app as usersroute };
