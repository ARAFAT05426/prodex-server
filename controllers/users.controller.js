import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  const { name } = req.query;

  try {
    const query = {};
    if (name) {
      const sanitizedName = name.replace(/:/g, "");
      query.name = { $regex: new RegExp(sanitizedName, "i") };
    }
    const users = await User.find(query).exec();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
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
  const { name, email, role, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getUsers, updateUser, addUser };
