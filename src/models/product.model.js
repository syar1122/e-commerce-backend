const mongoose = require("mongoose");
const sizeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shorten: {
    type: String,
    enum: ["xs", "s", "m", "l", "xl", "2xl"],
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const colorsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  sizes: [sizeSchema],
});

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  colors: {
    type: [colorsSchema],
  },
  price: {
    type: String,
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
