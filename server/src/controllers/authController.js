import User from "../models/User.js";
import cookieOptions from "../utils/cookieOptions.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("Name, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error("An account with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
  const token = generateToken(user._id);

  res.cookie("token", token, cookieOptions);
  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: buildAuthResponse(user),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);
  res.cookie("token", token, cookieOptions);

  res.json({
    success: true,
    message: "Logged in successfully",
    user: buildAuthResponse(user),
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    maxAge: 0,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: buildAuthResponse(req.user),
  });
});
