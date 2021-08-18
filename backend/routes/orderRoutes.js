import express from "express";
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getUserOrders,
} from "../controllers/orderController.js";

import { securedAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(securedAuth, addOrderItems);
router.route("/userorders").get(securedAuth, getUserOrders);
router.route("/:id").get(securedAuth, getOrderByID);
router.route("/:id/pay").put(securedAuth, updateOrderToPaid);

export default router;
