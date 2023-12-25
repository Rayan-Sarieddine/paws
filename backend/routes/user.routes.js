const express = require("express");
const {
  login,
  register,
  updateUser,
  getCart,
  emptyCart,
  addProductToCart,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/:id", updateUser);
router.get("/cart", getCart);
router.post("/emptyCart", emptyCart);
router.post("/addTocart", addProductToCart);
module.exports = router;
