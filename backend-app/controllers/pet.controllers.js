const Pet = require("../models/pet.model");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const addPet = async (req, res) => {
  console.log(req.user);
};
const editPet = async (req, res) => {};
const deletePet = async (req, res) => {};
const getPetofUser = async (req, res) => {};

module.exports = {
  addPet,
  editPet,
  deletePet,
  getPetofUser,
};
