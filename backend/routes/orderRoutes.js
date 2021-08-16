import express from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { securedAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(securedAuth, addOrderItems);

export default router;
