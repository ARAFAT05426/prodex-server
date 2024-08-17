import Product from "../models/products.model.js";

// Get products with filters and pagination
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 3,
      search = "",
      category,
      brand,
      priceRange,
      sortByPrice,
      sortByDate = "Newest", // Default to "Newest" if not provided
      author,
    } = req.query;

    let filter = {};

    if (author) {
      filter.author = author;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOptions = {};

    if (sortByPrice === "Low-High") {
      sortOptions.price = 1;
    } else if (sortByPrice === "High-Low") {
      sortOptions.price = -1;
    }

    // Sorting by date (newest first by default)
    sortOptions.createdAt = sortByDate === "Newest" ? -1 : 1;

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
      totalProducts,
    });
  } catch (error) {
    console.error("Error getting products:", error.message || error);
    res
      .status(500)
      .json({ message: "Server Error", error: error.message || error });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      author,
      name,
      price,
      stock,
      description,
      image,
      category,
      brand,
      features,
    } = req.body;

    if (
      !author ||
      !name ||
      !price ||
      !stock ||
      !description ||
      !image ||
      !category ||
      !brand ||
      !features
    ) {
      console.log(req.body);
      return res.status(400).json({ error: "Please fill out all fields." });
    }

    const newProduct = new Product({
      author,
      name,
      price,
      stock,
      description,
      image,
      category,
      brand,
      features,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
};

// Edit an existing product
const editProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      price,
      stock,
      description,
      image,
      category,
      brand,
      features,
    } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }
    if (!name || !price || !stock || !category || !brand) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, price, stock, description, image, category, brand, features },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export { getProducts, addProduct, editProduct, deleteProduct };
