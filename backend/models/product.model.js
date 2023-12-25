const mongoose = require("mongoose");

const productschema = new mongoose.Schema(
  {
    barcode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "DOG SUPPLIES",
        "CAT SUPPLIES",
        "BIRD SUPPLIES",
        "FISH SUPPLIES",
        "SMALL ANIMAL SUPPLIES",
        "ACCESSORIES",
        "OTHERS",
      ],
      default: "OTHERS",
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "default_product_image.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productschema);

module.exports = Product;
