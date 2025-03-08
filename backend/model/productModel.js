import mongoose from "mongoose";

// Review Schema
const reviewSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
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
      required: true,
      enum: ["Men", "Women", "Kids", "Electronics", "Furniture", "Grocery"],
    },
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    reviewCounts: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const products = mongoose.model("products", productSchema);
export default products;
