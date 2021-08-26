import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { securedAuth, adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(securedAuth, adminAuth, createProduct);
router.route("/:id/reviews").post(securedAuth, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(securedAuth, adminAuth, deleteProduct)
  .put(securedAuth, adminAuth, updateProduct);

export default router;
