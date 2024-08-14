import { addUser, getUsers, updateRole} from "../controllers/users.controller.js";
import authorize from "../middlewares/authorizeRoles.middleware.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
import express from "express";
const app = express.Router();

app.get("/", verifyToken, getUsers);

app.post("/add", verifyToken, addUser);

app.patch("/update", verifyToken, authorize("admin"), updateRole);

export { app as usersroute };
