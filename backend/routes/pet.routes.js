const express = require("express");
const {
  addPet,
  editPet,
  getAllPets,
  getPet,
  deletePet,
  filterPet,
  petStats,
} = require("../controllers/product.controllers");
const router = express.Router();

router.post("/", addPet);
router.put("/", editPet);
router.get("/", getAllPets);
router.get("/:id", getPet);
router.delete("/:id", deletePet);
router.post("/filter", filterPet);
router.post("/stats", petStats);
module.exports = router;
