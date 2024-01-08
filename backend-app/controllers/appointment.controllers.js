const Appointment = require("../models/appointment.model");
const Pet = require("../models/pet.model");

const addAppointment = async (req, res) => {
  const { pet_id, date } = req.body;
  if (!pet_id || !date) {
    return res.status(400).send({ message: "all fields are required" });
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    return res
      .status(400)
      .send({ message: "Invalid date format. Please use YYYY-MM-DD." });
  }
  const appointmentDate = new Date(date);
  const currentDate = new Date();

  if (appointmentDate <= currentDate) {
    return res
      .status(400)
      .send({ message: "Appointment date must be in the future." });
  }
  try {
    const pet = await Pet.findOne({ where: { id: pet_id } });
    if (pet === null) {
      return res.status(404).send({ message: "pet not found" });
    }
    const appointment = await Appointment.create({
      date: date,
      pet_id: pet_id,
    });
    return res.status(200).send({ appointment: appointment });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const changeAppoitmentStatus = async (req, res) => {};
const getAppointments = async (req, res) => {};

module.exports = {
  addAppointment,
  changeAppoitmentStatus,
  getAppointments,
};
