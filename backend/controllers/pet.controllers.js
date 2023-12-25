const Pet = require("../models/pet.model");
const path = require("path");

const addPet = async (req, res) => {
  let {
    name,
    age,
    type,
    breed,
    breed_description,
    description,
    story,
    status = "AVAILABLE",
    image = "default_pet_image.png",
  } = req.body;
  if (
    !name ||
    !age ||
    !type ||
    !breed ||
    !breed_description ||
    !description ||
    !story
  ) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    const existingPet = await Pet.findOne({ name });
    if (existingPet) {
      return res.status(409).send({ message: "pet name already exists" });
    }
    if (
      breed_description.length < 5 ||
      description.length < 5 ||
      story.length < 5
    ) {
      return res.status(400).send({ message: "not enough information given" });
    }
    if (age < 0) {
      return res.status(400).send({ message: "age cannot be negative" });
    }

    //pet name
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    name = capitalizedNames.join(" ");

    //category
    const validStatus = ["AVAILABLE", "ADOPTED", "LOST", "FOUND"];
    if (!validStatus.includes(status)) {
      return res.status(400).send({ message: "status does not exist" });
    }

    //image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${name}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(__dirname, "../public/images/pets", imageName);
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });

      image = imageName;
    }
    const pet = new Pet({
      name,
      age,
      type,
      breed,
      breed_description,
      description,
      story,
      status,
      image,
    });
    await pet.save();
    return res.status(200).send({ pet, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
const editPet = async (req, res) => {};
const getAllPets = async (req, res) => {};
const getPet = async (req, res) => {};
const deletePet = async (req, res) => {};
const filterPet = async (req, res) => {};
const petStats = async (req, res) => {};

module.exports = {
  addPet,
  editPet,
  getAllPets,
  getPet,
  deletePet,
  filterPet,
  petStats,
};
