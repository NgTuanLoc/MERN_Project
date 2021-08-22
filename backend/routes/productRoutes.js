import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct
} from "../controllers/productController.js";
import {securedAuth, adminAuth} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(securedAuth, adminAuth, deleteProduct);

export default router;
