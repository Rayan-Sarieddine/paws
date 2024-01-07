const express = require("express");
const app = express();

//To receive JSON
app.use(express.json());

//Dotenv dependencies
require("dotenv").config();

//File upload dependencies
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

//CORS fix
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.listen(8000, () => {
  console.log("LIVE");
});
