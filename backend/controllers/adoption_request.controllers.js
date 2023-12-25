const Request = require("../models/adoption_request.model");
const Pet = require("../models/pet.model");

const addRequest = async (req, res) => {
  const user_id = req.user._id;
  try {
    const { pet_id } = req.body;
    const pet = await Pet.findById(pet_id);
    if (!pet) {
    }
    if (pet.status !== "AVAILABLE") {
      return res.status(404).send({ message: "pet is not available" });
    }
    const newRequest = new Request({ pet_id, user_id });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const editRequest = async (req, res) => {};
const getAllRequests = async (req, res) => {};
const getRequests = async (req, res) => {};

module.exports = {
  addRequest,
  editRequest,
  getAllRequests,
  getRequests,
};
