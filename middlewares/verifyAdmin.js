import User from "../models/user.model.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req?.user?.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default verifyAdmin;
