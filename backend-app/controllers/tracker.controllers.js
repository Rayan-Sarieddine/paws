const Tracker = require("../models/tracker.model");
const Pet = require("../models/pet.model");

const addTracker = async (req, res) => {
  const { pet_id } = req.body;
  try {
    const pet = await Pet.findOne({ where: { id: pet_id } });
    if (pet === null) {
      return res.status(404).send({ message: "pet not found" });
    }
    const tracker = await Tracker.create({
      pet_id: pet_id,
    });
    return res.status(200).send({ tracker: tracker });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const setLocation = async (req, res) => {
  const { tracker_id, long, lat } = req.body;
  if (!tracker_id || !long || !lat) {
    return res.status(400).send({ message: "all field are required" });
  }
  try {
    const tracker = await Tracker.findByPk(tracker_id);
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
const getLocation = async (req, res) => {
  const { tracker_id } = req.body;
  try {
    const tracker = await Tracker.findByPk(tracker_id, {
      attributes: ["long", "lat"],
    });
    if (!tracker) {
      return res.status(404).send({ message: "Tracker not found" });
    }
    return res
      .status(200)
      .send({ location: { long: tracker.long, lat: tracker.lat } });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addTracker,
  setLocation,
  deleteTracker,
  getLocation,
};
