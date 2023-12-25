const express = require("express");
const app = express();
const { connectToMongoDb } = require("./configs/mongoDb.configs");
app.use(express.json());
require("dotenv").config();
app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
