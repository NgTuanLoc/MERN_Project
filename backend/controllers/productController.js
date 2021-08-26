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
// @ROUTE /api/product/:id
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

// @DESC Create product
// @ROUTE POST /api/products
// @ACCESS Private/admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample Product",
      price: 0,
      user: req.user._id,
      image: "/image/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample Description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
});

// @DESC Update Product
// @ROUTE PUT /api/products/:id
// @ACCESS Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.numReviews = numReviews;
      product.description = description;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
});

// @DESC Create New User Review
// @ROUTE POST /api/products/:id/reviews
// @ACCESS Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    console.log(req.user._id.toString());
    const aldreadyReview = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    console.log(aldreadyReview);
    if (aldreadyReview) {
      res.status(400);
      throw new Error("Product aldready reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews += 1;

    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.json({ message: "Review is sent !" });
  } else {
    res.status(404);
    throw new Error("Product Not Found !");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
