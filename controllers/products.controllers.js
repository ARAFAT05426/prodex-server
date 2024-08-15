import Product from "../models/products.model.js";

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      brand,
      priceRange,
      sortBy,
      sortOrder = "asc",
    } = req.query;
    let filter = {};

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
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    }
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
    res.status(500).json({ message: "Server Error", error });
  }
};

const addProduct = async (req, res) => {
  try {
    // Destructure and validate incoming data
    const {
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
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the product." });
  }
};

export { getProducts, addProduct };
