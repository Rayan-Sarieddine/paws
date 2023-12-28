const express = require("express");
const {
  login,
  register,
  updatePassword,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/pass", updatePassword);
module.exports = router;
