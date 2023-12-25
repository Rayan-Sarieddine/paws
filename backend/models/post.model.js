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
      required: true,
    },
    image: {
      type: String,
      required: true,
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
