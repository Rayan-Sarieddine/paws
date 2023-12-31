const express = require("express");
const {
  addPet,
  editPet,
  deletePet,
  getPetofUser,
} = require("../controllers/pet.controllers");
const router = express.Router();

router.post("/", addPet);
router.put("/", editPet);
router.post("/delete", deletePet);
router.get("/:id", getPetofUser);
module.exports = router;
