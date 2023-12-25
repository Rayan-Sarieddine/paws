const mongoose = require("mongoose");
const adoption_requestscheme = new mongoose.Schema(
  {
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Adoption_Request = mongoose.model(
  "Adoption_Request",
  adoption_requestscheme
);
module.exports = Adoption_Request;
