const express = require("express");
const {
  addRequest,
  editRequest,
  getAllRequests,
  getRequest,
} = require("../controllers/adoption_request.controllers");
const router = express.Router();

router.post("/", addRequest);
router.put("/:id", editRequest);
router.post("/all", getAllRequests);
router.get("/:id", getRequest);
module.exports = router;
