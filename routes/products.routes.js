import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/products.controller.js";
const app = express.Router();

app.get("/", getProducts);

app.post("/add", addProduct);

app.put("/update", editProduct);

app.delete("/delete/:id", deleteProduct);

export { app as productRoute };
