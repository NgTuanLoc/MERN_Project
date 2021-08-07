import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// @DESC Fetch All Product
// @ROUTE Get /api/products
// @ACCESS Public

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // res.status(401);
    // throw new Error("Not Authorized");
    res.json(products);
  })
);

// @DESC Fetch Single Product By ID
// @ROUTE Get /api/products:id
// @ACCESS Public

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404);
      throw new Error("Product Not Found !");
    }
  })
);

export default router;
