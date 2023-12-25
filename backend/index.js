const express = require("express");
const app = express();
const { authMiddleware } = require("./middlewares/auth.middleware");
const { userRoleMiddleware } = require("./middlewares/user_role.middleware");
const { adminRoleMiddleware } = require("./middlewares/admin_role.middleware");
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

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", authMiddleware, userRoleMiddleware, userRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/products", authMiddleware, userRoleMiddleware, productRoutes);

const petRoutes = require("./routes/pet.routes");
app.use("/pets", authMiddleware, userRoleMiddleware, petRoutes);

const postRoutes = require("./routes/post.routes");
app.use("/posts", authMiddleware, userRoleMiddleware, postRoutes);

const adoptionRequestRoutes = require("./routes/adoption_request.routes");
app.use("/requests", authMiddleware, userRoleMiddleware, adoptionRequestRoutes);

const orderRoutes = require("./routes/order.routes");
app.use("/orders", authMiddleware, userRoleMiddleware, orderRoutes);

app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
