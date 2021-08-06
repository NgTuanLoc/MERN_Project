import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    rating: {
      type: Number,
      requied: true,
    },
    comment: {
      type: String,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required,
    },
    description: {
      type: String,
      required,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required,
      default: 0,
    },
    numReviews: {
      type: Number,
      required,
      default: 0,
    },
    price: {
      type: Number,
      required,
      default: 0,
    },
    countInStock: {
      type: Number,
      required,
      default: 0,
    },
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.Model("Product", productSchema);
