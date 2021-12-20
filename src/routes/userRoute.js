const express = require("express");
const route = express.Router();
const { getAllUsers, createUser } = require("../controllers/user.controller");

route.get("/", getAllUsers);

route.post("/", createUser);

module.exports = route;
