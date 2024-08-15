import express from "express";
import { addProduct, getProducts } from "../controllers/products.controllers.js";
const app = express.Router();

app.get('/', getProducts)

app.post('/add', addProduct)

export { app as productRoute };
