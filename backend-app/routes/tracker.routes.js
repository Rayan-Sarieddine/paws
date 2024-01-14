const express = require("express");
const {
  addTracker,
  setLocation,
  deleteTracker,
  getLocation,
  addPetToTracker,
  getLocationById,
} = require("../controllers/tracker.controllers");
const router = express.Router();

router.post("/", addTracker);
router.post("/pet", addPetToTracker);
router.post("/delete", deleteTracker);
router.post("/geo", getLocation);
router.post("/geoId", getLocationById);
router.put("/", setLocation);
module.exports = router;
