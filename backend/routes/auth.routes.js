const express = require("express");
const {
  login,
  register,
  updatePassword,
  googleAuth,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/login", login);

router.post("/register", register);
router.post("/pass", updatePassword);
router.post("/google", googleAuth);
module.exports = router;
