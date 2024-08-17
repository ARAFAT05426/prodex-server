import Product from "../models/products.model.js";

const getStats = async (req, res) => {
    const { email } = req.params;

    try {
        // Filter for products by author email
        const filter = email ? { author: email } : {};

        // Count total products
        const totalProducts = await Product.countDocuments(filter);

        // Respond with statistics
        res.json({
            totalProducts
        });
    } catch (error) {
        console.error("Error fetching statistics:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { getStats };
