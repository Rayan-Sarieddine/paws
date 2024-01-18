const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const relationships = require("./models/relationships.models");
const { authMiddleware } = require("./middlewares/auth.middleware");
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

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

//Tracker Routes
const trackerRoutes = require("./routes/tracker.routes");
app.use("/tracker", trackerRoutes);

//Pet Routes
const petRoutes = require("./routes/pet.routes");
app.use("/pets", authMiddleware, petRoutes);

//Appointment Routes
const appointmentRoutes = require("./routes/appointment.routes");
app.use("/appointment", authMiddleware, appointmentRoutes);

const sequelize = require("./configs/db.configs");
sequelize.sync({ force: true }).then(() => {
  app.listen(8000, () => {
    console.log("LIVE");
  });
});
