import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);

// @DESC Fetch Single Product By ID
// @ROUTE Get /api/products:id
// @ACCESS Public

router.route("/:id").get(getProductById);

export default router;
