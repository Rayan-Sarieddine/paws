const express = require("express");
const {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
  createChatSession,
  getChatSession,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/", addProductToCart);
router.put("/", updateUser);
router.get("/", getCart);
router.get("/emptyCart", emptyCart);
router.post("/chat", createChatSession);
router.get("/chat", getChatSession);
module.exports = router;
