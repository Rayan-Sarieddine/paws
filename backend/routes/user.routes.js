const express = require("express");
const {
  updateUser,
  getCart,
  emptyCart,
  addProductToCart,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/", addProductToCart);
router.put("/:id", updateUser);
router.get("/", getCart);
router.post("/emptyCart", emptyCart);

module.exports = router;
