import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @DESC User Authentication And Get Token
// @ROUTE POST /api/users/login
// @ACCESS Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password or Email");
  }
});

export { authUser };
