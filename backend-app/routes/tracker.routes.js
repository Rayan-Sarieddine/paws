const express = require("express");
const {
  addTracker,
  setLocation,
  deleteTracker,
  getLocation,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/", addTracker);
router.delete("/", deleteTracker);
router.get("/", getLocation);
router.put("/", setLocation);
module.exports = router;
