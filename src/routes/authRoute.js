const express = require("express");
const route = express.Router();
const { login, createUser } = require("../controllers/user.controller");

route.post("/login", login);

route.post("/signup", createUser);

module.exports = route;
