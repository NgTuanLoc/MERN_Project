import express from "express";
import { addOrderItems, getOrderByID } from "../controllers/orderController.js";

import { securedAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(securedAuth, addOrderItems);
router.route("/:id").get(securedAuth, getOrderByID);

export default router;
