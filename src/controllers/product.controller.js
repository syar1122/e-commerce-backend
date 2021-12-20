const Category = require("../models/category");
const Product = require("../models/product.model");
const productValidation = require("../validations/productValidate");

exports.getAllProduct = async (req, res) => {
  let { mainCat, subCat } = req.query;

  let products = [];
  let mainCatId, subCatId;
  let category = await Category.findOne({ name: mainCat });
  let subCategory = await Category.findOne({ name: subCat });
  if (category) {
    mainCatId = category._id.toString();
  }
  if (subCategory) {
    subCatId = subCategory._id.toString();
    console.log(subCategory);
  }
  let filter = {};
  if (category && !subCategory) {
    filter = { categories: mainCatId };
  } else if (!category && subCategory) {
    filter = { subCategory: subCatId };
  } else if (!category && !subCategory) {
    filter = {};
  } else if (category && subCategory) {
    filter = { categories: mainCatId, subCategory: subCatId };
  }
  console.log(filter);
  Product.find(filter)
    .populate("categories")
    .then((data) => {
      if (data) {
        products = data;
      }
      res.status(200).json({ message: "products get route", products });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

exports.createProduct = (req, res) => {
  const { body } = req;
  productValidation
    .validateAsync(body)
    .then((product) => {
      console.log("validated data", product);
      if (product) {
        let newProduct = new Product(product);
        newProduct
          .save()
          .then((nProduct) => {
            res
              .status(201)
              .json({ message: "product saved", product: nProduct });
          })
          .catch((err) => {
            res.status(500).json({ message: "Internal server error" });
          });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    });
};

exports.getProduct = (req, res) => {
  let { id } = req.params;
  console.log(id);
  if (id) {
    Product.findById(id)
      .populate("categories")
      .then((product) => {
        if (product) {
          res.status(200).json({ product });
        } else {
          res.status(404).json({ message: "product not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server err", err });
      });
  }
};

exports.editProduct = (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  if (id) {
    Product.findByIdAndUpdate(id, req.body, { new: true })
      .then((updatedProduct) => {
        if (updatedProduct) {
          res.status(201).json({ message: "updated", updatedProduct });
        } else {
          res.status(404).json({ message: "product not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  }
};

exports.deleteProduct = (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  if (id) {
    Product.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).json({ message: "delete route", data });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
};
