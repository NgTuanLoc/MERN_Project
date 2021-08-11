import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @DESC User Authentication And Get Token
// @ROUTE POST /api/users/login
// @ACCESS Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req);
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password or Email");
  }
});

// @DESC Register new user
// @ROUTE POST /api/users
// @ACCESS Public
const registerUser = asyncHandler(async (req, res) => {
const { name, email, password } = req.body;
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(400);
    throw new Error("User aldready existed !");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user input !");
  }
});

// @DESC Get user profile
// @ROUTE POST /api/users/profile
// @ACCESS Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});

export { authUser, getUserProfile, registerUser };
