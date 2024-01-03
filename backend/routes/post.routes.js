const express = require("express");
const { addPost } = require("../controllers/post.controllers");
const router = express.Router();

router.post("/", addPost);

module.exports = router;
