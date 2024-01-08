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
const setLocation = async (req, res) => {};
const deleteTracker = async (req, res) => {};
const getLocation = async (req, res) => {};

module.exports = {
  addTracker,
  setLocation,
  deleteTracker,
  getLocation,
};
