const express = require("express");
const {
  addPost,
  editPost,
  getAllPosts,
  getPost,
  deletePost,
} = require("../controllers/post.controllers");
const router = express.Router();

router.post("/", addPost);
router.put("/", editPost);
router.get("/", getAllPosts);
router.get("/:name", getPost);
router.delete("/:id", deletePost);
module.exports = router;
