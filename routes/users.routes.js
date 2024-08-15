import { addUser, getUsers, updateRole} from "../controllers/users.controller.js";
import authorize from "../middlewares/authorizeRoles.middleware.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import express from "express";
const app = express.Router();

app.get("/", verifyToken, getUsers);

app.put("/add", addUser);

app.patch("/update", verifyToken, updateRole);

export { app as usersroute };
