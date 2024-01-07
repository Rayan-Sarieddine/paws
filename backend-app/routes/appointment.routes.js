const express = require("express");
const {
  addAppointment,
  changeAppoitmentStatus,

  getAppointments,
} = require("../controllers/appointment.controllers");
const router = express.Router();

router.post("/", addAppointment);
router.get("/", getAppointments);
router.put("/", changeAppoitmentStatus);
module.exports = router;
