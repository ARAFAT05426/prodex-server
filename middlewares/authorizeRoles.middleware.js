import User from "../models/user.model.js";

const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req?.user?.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: `Access denied: Requires one of the following roles: ${roles.join(', ')}`
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
};

export default authorize;
