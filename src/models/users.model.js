const { bool, boolean } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  age: {
    type: Number,
    required: false,
    default: 18,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
