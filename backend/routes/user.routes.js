const express = require("express");
const {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/", addProductToCart);
router.put("/", updateUser);
router.get("/", getCart);
router.get("/emptyCart", emptyCart);

module.exports = router;
