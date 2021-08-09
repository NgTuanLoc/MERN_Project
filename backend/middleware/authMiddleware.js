import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const securedAuth = asyncHandler(async (req, res, next) => {
  const [Bearer, token] = req.headers.authorization
    ? req.headers.authorization.split(" ")
    : [null, null];

  if (token && Bearer) {
    try {
      const decodedToken = JWT.verify(token, process.env.JWT_TOKEN);
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorize, Token Failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorize");
  }
});

export { securedAuth };
