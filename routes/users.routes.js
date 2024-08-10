import { addUser, getUsers, updateRole} from "../controllers/users.controller.js";
import verifyAdmin from "../utilities/verifyAdmin.js";
import verifyToken from "../utilities/verifyToken.js";
import express from "express";
const app = express.Router();

app.get("/", verifyToken, getUsers);

app.post("/add", verifyToken, addUser);

app.patch("/update", verifyToken, verifyAdmin, updateRole);

export { app as usersroute };
