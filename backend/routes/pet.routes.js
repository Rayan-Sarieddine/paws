const express = require("express");
const {
  addPet,
  editPet,
  getAllPets,
  getPet,
  deletePet,
  filterPet,
  petStats,
} = require("../controllers/pet.controllers");
const router = express.Router();

router.post("/", addPet);
router.put("/", editPet);
router.get("/", getAllPets);
router.get("/:name", getPet);
router.delete("/:id", deletePet);
router.post("/filter", filterPet);
router.post("/stats", petStats);
module.exports = router;
