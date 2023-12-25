const mongoose = require("mongoose");

const postschema = new mongoose.Schema(
  {
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      enum: ["BEIRUT", "SOUTH", "NORTH", "BEKAA", "MOUNT LEBANON", "OTHER"],
      default: "OTHER",
    },
    image: {
      type: String,
      default: "defualt_pet_picture.png",
    },
    type: {
      type: String,
      enum: ["LOST", "FOUND"],
      default: "FOUND",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postschema);
module.exports = Post;
