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
const changeAppoitmentStatus = async (req, res) => {
  const { appointment_id, status } = req.body;

  if (!appointment_id || !status) {
    return res
      .status(400)
      .send({ message: "Appointment ID and status are required." });
  }

  if (!["PENDING", "FINISHED", "CANCELED"].includes(status)) {
    return res.status(400).send({ message: "Invalid status value." });
  }

  try {
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      return res.status(404).send({ message: "Appointment not found." });
    }

    appointment.status = status;
    await appointment.save();

    return res.status(200).send({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const getAppointments = async (req, res) => {
  const { pet_id } = req.body;

  if (!pet_id) {
    return res.status(400).send({ message: "Pet id is required." });
  }
  try {
    const pet = await Pet.findOne({ where: { id: pet_id } });
    if (pet === null) {
      return res.status(404).send({ message: "pet not found" });
    }
    const appointments = await Appointment.findAll({
      where: { pet_id: pet_id },
    });

    if (appointments.length === 0) {
      return res.status(404).send({ message: "No appointments found." });
    }

    return res.status(200).send(appointments);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addAppointment,
  changeAppoitmentStatus,
  getAppointments,
};
