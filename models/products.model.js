import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    default: ""
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    default: "",
  },
  brand: {
    type: String,
    required: true,
    default: "",
  },
  ratings: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 4.3,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  features: {
    type: [String],
    required: false,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
