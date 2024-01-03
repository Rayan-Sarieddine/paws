const Request = require("../models/adoption_request.model");
const Pet = require("../models/pet.model");

//Function to create a new adoption request by user for a pet
const addRequest = async (req, res) => {
  const user_id = req.user._id;
  try {
    const { pet_id } = req.body;
    const pet = await Pet.findById(pet_id);
    if (!pet) {
      return res.status(404).send({ message: "Pet not found" });
    }
    if (pet.status !== "AVAILABLE") {
      return res.status(404).send({ message: "pet is not available" });
    }
    const newRequest = new Request({ pet_id, user_id });
    await newRequest.save();
    return res.status(201).json(newRequest);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to change the status of the adoption request by the admin
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
    return res.status(500).send({ message: error.message });
  }
};

//Function to get all the adoption requests to be displayed for review by the admin
const getAllRequests = async (req, res) => {
  const { status } = req.body;
  const statusOptions = ["PENDING", "APPROVED", "REJECTED"];
  if (!statusOptions.includes(status)) {
    return res.status(400).send({ message: "status does not exist" });
  }
  try {
    const requests = await Request.find({ status: status })
      .populate("pet_id", "type breed age image name")
      .populate("user_id", "name email image number");
    if (requests.length == 0) {
      return res.status(204).send({ message: "no requests found" });
    }
    return res.status(200).send({ message: "success", requests: requests });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const getRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    const request = await Request.findById(requestId)
      .populate("pet_id", "type breed age image")
      .populate("user_id", "name email image number");

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    return res.status(200).send({ message: "success", request: request });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addRequest,
  editRequest,
  getAllRequests,
  getRequest,
};
