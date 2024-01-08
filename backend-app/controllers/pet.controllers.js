const Pet = require("../models/pet.model");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const addPet = async (req, res) => {
  const belongs_to = req.user.id;
  let { name, type, age } = req.body;
  if (!name || !type || !age || !req.files || !req.files.image) {
    console.log(req.body);
    return res.status(400).send({ message: "all fields are required" });
  }
  if (age < 0 || age > 50) {
    return res.status(400).send({ message: "age is not valid" });
  }
  // Validate image
  if (Array.isArray(req.files.image)) {
    return res
      .status(400)
      .send({ message: "Only one image can be uploaded at a time" });
  }
  try {
    const imageFile = req.files.image;
    const imageExtension = path.extname(imageFile.name);
    const imageName = `${belongs_to}-${Date.now()}${imageExtension}`;
    const imageDir = path.join(__dirname, "../public/images/pets", imageName);

    await imageFile.mv(imageDir);

    // Create a FormData object and append the image
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imageDir));

    // Send POST request to Flask server
    const flaskResponse = await axios.post(
      "http://localhost:5000/predict",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Extract breed from Flask response
    const breed = flaskResponse.data.breed;

    // Create a new pet with the breed
    const pet = await Pet.create({
      belongs_to: belongs_to,
      age: age,
      name: name,
      type: type,
      breed: breed,
      image: imageName,
    });
    return res.status(200).send({ pet, status: "success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const editPet = async (req, res) => {
  const { name, age, image, id } = req.body;
  if (!id) {
    return res.status(404).send({ message: "id field required" });
  }
  let updatedValues = {};
  try {
    const pet = await Pet.findOne({ where: { id: id } });
    if (pet === null) {
      return res.status(404).send({ message: "pet not found" });
    }
    if (name) {
      updatedValues.name = name;
    }
    if (age) {
      if (age > 50 || age < 0) {
        return res.status(400).send({ message: "age is not valid" });
      }
      updatedValues.age = age;
    }
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${id}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(__dirname, "../public/images/pets", imageName);
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });
      updatedValues.image = imageName;
    }
    const updatedPet = await pet.update(updatedValues);
    return res.status(200).send({ message: "pet updated", pet: updatedPet });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const deletePet = async (req, res) => {};
const getPetofUser = async (req, res) => {};

module.exports = {
  addPet,
  editPet,
  deletePet,
  getPetofUser,
};
