const express = require("express");
const app = express();
const { connectToMongoDb } = require("./configs/mongoDb.configs");
app.use(express.json());
require("dotenv").config();
const fileUpload = require("express-fileupload");
app.use(fileUpload());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
