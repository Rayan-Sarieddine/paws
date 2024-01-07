const express = require("express");
const {
  addPet,
  editPet,
  deletePet,
  getPetofUser,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/", addPet);
router.put("/", editPet);
router.delete("/", deletePet);
router.get("/", getPetofUser);
module.exports = router;
