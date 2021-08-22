import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @DESC Fetch All Product
// @ROUTE Get /api/products
// @ACCESS Public
const getProducts = asyncHandler(
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    // res.status(401);
    // throw new Error("Not Authorized");
    res.json(products);
  })
);

// @DESC Fetch Product By Id
// @Route Get /api/product/:id
// @ACCESS Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found !");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Product Not Found !");
  }
});

// @DESC Delete Product By Id
// @ROUTE /api/admin/product/:id
// @ACCESS Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ Message: "Product removed" });
    }
  } catch (error) {
    res.status(404);
    throw new Error("Product Not Found !");
  }
});

export { getProducts, getProductById, deleteProduct };
