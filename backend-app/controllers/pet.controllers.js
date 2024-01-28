const Pet = require("../models/pet.model");
const User = require("../models/user.model");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { response } = require("express");

//Function to add a new pet to a the user
const addPet = async (req, res) => {
  const belongs_to = req.user.id;
  let { name, type, date_of_birth } = req.body;
  if (!name || !type || !date_of_birth || !req.files || !req.files.image) {
    return res.status(400).send({ message: "all fields are required" });
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date_of_birth)) {
    return res
      .status(400)
      .send({ message: "Invalid date format. Please use YYYY-MM-DD." });
  }
  const dOB = new Date(date_of_birth);
  const currentDate = new Date();

  if (dOB > currentDate) {
    return res
      .status(400)
      .send({ message: "Date of birth cannot be in the future" });
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
      date_of_birth: date_of_birth,
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

//Function to edit the pet information of the user
const editPet = async (req, res) => {
  const { name, date_of_birth, image, id } = req.body;
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
    if (date_of_birth) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!dateRegex.test(date_of_birth)) {
        return res
          .status(400)
          .send({ message: "Invalid date format. Please use YYYY-MM-DD." });
      }
      const dOB = new Date(date);
      const currentDate = new Date();

      if (dOB > currentDate) {
        return res
          .status(400)
          .send({ message: "Date of birth cannot be in the future" });
      }
      updatedValues.date_of_birth = date_of_birth;
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

//Function to delete a specified pet
const deletePet = async (req, res) => {
  const { id } = req.body;
  try {
    const pet = await Pet.findOne({ where: { id: id } });
    if (pet === null) {
      return res.status(404).send({ message: "pet not found" });
    }
    await pet.destroy();
    return res.status(200).send({ message: "pet deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get pets of the user
const getPetofUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (user === null) {
      return res.status(404).send({ message: "user not found" });
    }
    const pets = await Pet.findAll({
      where: { belongs_to: user_id },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    return res.status(200).send({ message: "success", pets: pets });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addPet,
  editPet,
  deletePet,
  getPetofUser,
};
