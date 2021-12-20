const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parentId: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
});

module.exports = mongoose.model("Category", subCategorySchema);
