//Express
const express = require("express");
// app.use(express.static("public"));
const app = express();

//DB connection
const { connectToMongoDb } = require("./configs/mongoDb.configs");

//MiddleWares
const { authMiddleware } = require("./middlewares/auth.middleware");
const { userRoleMiddleware } = require("./middlewares/user_role.middleware");
const { adminRoleMiddleware } = require("./middlewares/admin_role.middleware");

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

//Auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

//User Routes
const userRoutes = require("./routes/user.routes");
app.use("/user", authMiddleware, userRoleMiddleware, userRoutes);

//Product Routes
const productRoutes = require("./routes/product.routes");
app.use("/products", authMiddleware, userRoleMiddleware, productRoutes);

//Pet Routes
const petRoutes = require("./routes/pet.routes");
app.use("/pets", authMiddleware, userRoleMiddleware, petRoutes);

//Post Routes
const postRoutes = require("./routes/post.routes");
app.use("/posts", authMiddleware, userRoleMiddleware, postRoutes);

//Adoption request Routes
const adoptionRequestRoutes = require("./routes/adoption_request.routes");
app.use("/requests", authMiddleware, userRoleMiddleware, adoptionRequestRoutes);

//Order routes
const orderRoutes = require("./routes/order.routes");
app.use("/orders", authMiddleware, userRoleMiddleware, orderRoutes);

//Invoke connection to DB and Port
app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
