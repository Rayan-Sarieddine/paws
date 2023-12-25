const express = require("express");
const {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
  createChatSession,
  getAllChatSession,
  deleteChatSession,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/", addProductToCart);
router.put("/", updateUser);
router.get("/", getCart);
router.get("/emptyCart", emptyCart);
router.post("/chat", createChatSession);
router.get("/chats", getAllChatSession);
router.post("/deleteChat", deleteChatSession);
module.exports = router;
