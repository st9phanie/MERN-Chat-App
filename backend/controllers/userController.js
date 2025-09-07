import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";

// ------------------ SIGNUP ------------------
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio
    });

    const token = generateToken(newUser._id);

    // Remove password before sending
    const userData = newUser.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      userData,
      token,
      message: "Account created successfully"
    });

  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ------------------ LOGIN ------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      userData,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ------------------ UPDATE PROFILE ------------------
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    const updateData = {
      ...(bio && { bio }),
      ...(fullName && { fullName }),
      ...(profilePic && { profilePic }) // Optional: base64 string or URL
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password" // exclude password from response
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });

  } catch (error) {
    console.error("Update Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Route handler to return authenticated user info
 */
export const checkAuth = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true, user: req.user });
};