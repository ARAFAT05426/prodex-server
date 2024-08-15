import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  const { name, role, page = 1, limit = 10 } = req.query;

  try {
    const query = {};
    if (role) {
      query.role = role;
    }
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    const totalUsers = await User.countDocuments(query);

    return res.status(200).json({
      success: true,
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateRole = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Email and role are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    user.role = role;
    await user.save();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error updating user role:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  const user = req.body;
  const { email } = user;
  if (!email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    const responce = await User.findOneAndUpdate(
      { email },
      { $set: { ...user } },
      { new: true, upsert: true }
    );

    const message = responce.isNew
      ? "User created successfully"
      : "User updated successfully";

    return res.status(user.isNew ? 201 : 200).json({ message, responce });
  } catch (error) {
    console.error("Error adding/updating user:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export { getUsers, updateRole, addUser };
