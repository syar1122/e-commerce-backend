const Category = require("../models/category");
const winston = require("winston");

exports.getAllCategory = (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error!!!", error: err });
    });
};

exports.createCategory = (req, res) => {
  const { name, parentId } = req.body;
  let newCat = new Category({ name, parentId });
  newCat
    .save()
    .then((newCat) => {
      winston.info(`${req.user.email} added ${newCat.name}`);
      res
        .status(201)
        .json({ message: "category created succesfuly", category: newCat });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ message: err.keyValue.name + " is already exist!!!" });
      }
      res.status(500).json({ message: "internal server error!!!", error: err });
    });
};

exports.editCategory = (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  Category.findByIdAndUpdate(id, { name }, { new: true })
    .then((newCat) => {
      if (!newCat)
        return res.status(404).json({ message: "category not found" });
      res.status(201).json({ message: "updated succesfuly", category: newCat });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal servet error!!!", error: err });
    });
};

exports.deleteCategory = (req, res) => {
  let { id } = req.params;
  Category.findByIdAndRemove(id)
    .then((deletedCat) => {
      if (!deletedCat)
        return res.status(404).json({ message: "category not found" });
      res
        .status(200)
        .json({ message: "deleted succesfuly", category: deletedCat });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal servet error!!!", error: err });
    });
};

exports.getSubCategories = (req, res) => {
  console.log(req.query);
  let { parentId } = req.query;
  Category.find({ parentId }).then((categories) => {
    res.json({ categories });
  });
};

exports.getMainCategories = (req, res) => {
  Category.find({ parentId: { $exists: false } }).then((categories) => {
    res.json({ categories });
  });
};
