const express = require("express");
const route = express.Router();

const {
  getAllProduct,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth");

route.get("/", getAllProduct);

route.get("/:id", getProduct);

route.post("/", verifyToken, isAdmin, createProduct);

route.put("/:id", verifyToken, isAdmin, editProduct);

route.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = route;
