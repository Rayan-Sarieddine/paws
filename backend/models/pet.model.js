const mongoose = require("mongoose");

const petscheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    breed_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "ADOPTED", "LOST", "FOUND"],
      default: "AVAILABLE",
    },
    image: {
      type: String,
      default: "default_pet_image.png",
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petscheme);
module.exports = Pet;
