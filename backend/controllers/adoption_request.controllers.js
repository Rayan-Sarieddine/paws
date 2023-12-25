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
const editRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;
    const statusOptions = ["PENDING", "APPROVED", "REJECTED"];
    if (!statusOptions.includes(status)) {
      return res.status(400).send({ message: "status does not exist" });
    }
    const updatedRequest = await Request.findByIdAndUpdate(requestId, {
      status,
    });
    if (!updatedRequest) {
      return res.status(404).send({ message: "Request not found" });
    }
    res.status(200).send({ message: "updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllRequests = async (req, res) => {};
const getRequests = async (req, res) => {};

module.exports = {
  addRequest,
  editRequest,
  getAllRequests,
  getRequests,
};
