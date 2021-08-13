import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { securedAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(securedAuth, getUserProfile)
  .put(securedAuth, updateUserProfile);
export default router;
