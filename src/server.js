const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const winston = require("winston");
require("winston-mongodb");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
var path = require("path");
const swaggerPath = path.resolve(__dirname, "./swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

const env = require("dotenv");

const app = express();
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
env.config("dotenv");
//DATABASE connection
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    console.log("connecting to mongo");
    winston.add(
      new winston.transports.MongoDB({
        db: "mongodb://127.0.0.1:27017/e-commerce",
        level: "error",
        useUnifiedTopology: true,
      })
    );
    winston.add(
      new winston.transports.MongoDB({
        db: "mongodb://127.0.0.1:27017/e-commerce",
        level: "info",
        useUnifiedTopology: true,
      })
    );
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

// server listener

app.listen(5000, () => {
  console.log("app listining ...");
});
