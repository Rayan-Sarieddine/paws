const express = require("express");
const {
  addRequest,
  editRequest,
  getAllRequests,
  getRequests,
} = require("../controllers/adoption_request.controllers");
const router = express.Router();

router.post("/", addRequest);
router.put("/:id", editRequest);
router.post("/all", getAllRequests);
router.get("/:id", getRequests);
module.exports = router;
