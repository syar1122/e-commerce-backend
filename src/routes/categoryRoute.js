const express = require("express");
const {
  getAllCategory,
  getSubCategories,
  createCategory,
  editCategory,
  deleteCategory,
  getMainCategories,
} = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth");

const route = express.Router();

route.get("/", getAllCategory);

route.get("/subCategories", getSubCategories);

route.get("/mainCategories", getMainCategories);

route.post("/", verifyToken, isAdmin, createCategory);

route.put("/:id", verifyToken, isAdmin, editCategory);

route.delete("/:id", verifyToken, isAdmin, deleteCategory);

module.exports = route;
