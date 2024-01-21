const Tracker = require("../models/tracker.model");
const Pet = require("../models/pet.model");

//Function to create a new tracker
const addTracker = async (req, res) => {
  const { secret } = req.body;
  try {
    const existingTracker = await Tracker.findOne({
      where: { secret: secret },
    });
    if (existingTracker) {
      return res.status(409).send({ message: "tracker secret already exists" });
    }
    const tracker = await Tracker.create({
      secret: secret,
    });
    return res.status(200).send({ tracker: tracker });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to assign a pet to the tracker
const addPetToTracker = async (req, res) => {
  const { pet_id, secret } = req.body;
  try {
    const updatetracker = await Tracker.findOne({
      where: { secret: secret },
    });
    updatetracker.pet_id = pet_id;
    await updatetracker.save();
    return res.status(200).send({ tracker: updatetracker });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to change the location (long and lat) in a specified tracker
const setLocation = async (req, res) => {
  const { secret, long, lat } = req.body;
  if (!secret || !long || !lat) {
    return res.status(400).send({ message: "all field are required" });
  }
  try {
    const tracker = await Tracker.findOne({
      where: { secret: secret },
    });
    if (!tracker) {
      return res.status(404).send({ message: "Tracker not found" });
    }
    tracker.long = long;
    tracker.lat = lat;
    await tracker.save();
    return res.status(200).send({ tracker: tracker });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to delete a tracker
const deleteTracker = async (req, res) => {
  const { tracker_id } = req.body;
  try {
    const tracker = await Tracker.findByPk(tracker_id);
    if (!tracker) {
      return res.status(404).send({ message: "Tracker not found" });
    }
    await tracker.destroy();
    return res.status(200).send({ message: "Tracker deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to retrieve the location (long and lat) of a specified tracker
const getLocation = async (req, res) => {
  const { secret } = req.body;
  try {
    const tracker = await Tracker.findOne({
      where: { secret: secret },
      attributes: ["long", "lat"],
    });
    if (!tracker) {
      return res.status(404).send({ message: "Tracker not found" });
    }
    return res.status(200).send({
      message: "success",
      location: { long: tracker.long, lat: tracker.lat },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to retrieve the location (long and lat) of a specified pet
const getLocationById = async (req, res) => {
  const { pet_id } = req.body;
  try {
    const tracker = await Tracker.findOne({
      where: { pet_id: pet_id },
      attributes: ["long", "lat"],
    });
    if (!tracker) {
      return res.status(404).send({ message: "Tracker not found" });
    }
    return res.status(200).send({
      message: "success",
      location: { long: tracker.long, lat: tracker.lat },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addTracker,
  setLocation,
  deleteTracker,
  getLocation,
  addPetToTracker,
  getLocationById,
};
