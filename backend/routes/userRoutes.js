import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { securedAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(securedAuth, getUserProfile);
export default router;
