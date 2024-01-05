const express = require("express");
const {
  addPost,
  editPost,
  getAllPosts,
  getPost,
  deletePost,
  findPets,
} = require("../controllers/post.controllers");
const router = express.Router();

router.post("/", addPost);
router.post("/find", findPets);
router.put("/", editPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);
module.exports = router;
