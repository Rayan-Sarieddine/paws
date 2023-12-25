const Product = require("../models/product.model");
const path = require("path");
const addProduct = async (req, res) => {
  let {
    barcode,
    name,
    price,
    category = "OTHERS",
    description,
    details,
    stock,
    image = "default_product_image.png",
  } = req.body;
  if (!barcode || !name || !price || !description || !details || !stock) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    const existingProduct = await Product.findOne({ barcode });
    if (existingProduct) {
      return res.status(409).send({ message: "Product already exists" });
    }
    if (details.length < 5 || description.length < 5) {
      return res.status(400).send({ message: "not enough information given" });
    }
    if (stock < 0 || price < 0) {
      return res.status(400).send({ message: "numbers cannot be negative" });
    }

    //product name
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    name = capitalizedNames.join(" ");

    //category
    const validCategories = [
      "DOG SUPPLIES",
      "CAT SUPPLIES",
      "BIRD SUPPLIES",
      "FISH SUPPLIES",
      "SMALL ANIMAL SUPPLIES",
      "ACCESSORIES",
      "OTHERS",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).send({ message: "category does not exist" });
    }

    //image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${barcode}${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/products",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });

      image = imageName;
    }
    const product = new Product({
      barcode,
      name,
      price,
      category,
      description,
      details,
      stock,
      image,
    });
    await product.save();
    return res.status(200).send({ product, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
const editProduct = async (req, res) => {
  let { barcode, name, price, category, description, details, stock, image } =
    req.body;
  let updatedValues = {};
  try {
    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    if (name) {
      const trimmedName = name.trim();
      const nameParts = trimmedName.split(" ");
      const capitalizedNames = nameParts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      );
      name = capitalizedNames.join(" ");
      updatedValues.name = name;
    }
    if (price) {
      if (price < 0) {
        return res.status(400).send({ message: "price cannot be negative" });
      }
      updatedValues.price = price;
    }
    if (category) {
      const validCategories = [
        "DOG SUPPLIES",
        "CAT SUPPLIES",
        "BIRD SUPPLIES",
        "FISH SUPPLIES",
        "SMALL ANIMAL SUPPLIES",
        "ACCESSORIES",
        "OTHERS",
      ];
      if (!validCategories.includes(category)) {
        return res.status(400).send({ message: "category does not exist" });
      }
      updatedValues.category = category;
    }
    if (description) {
      if (description.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.description = description;
    }
    if (details) {
      if (details.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.details = details;
    }
    if (stock) {
      if (stock < 0) {
        return res.status(400).send({ message: "numbers cannot be negative" });
      }
      updatedValues.stock = stock;
    }
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${barcode}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/products",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });
      updatedValues.image = imageName;
    }
    await Product.findByIdAndUpdate(product._id, updatedValues);
    return res.status(200).send({ message: "product updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};
const getAllproducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const barcode = req.params.barcode;
    const product = await Product.findOne({ barcode: barcode });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).json({ product: product });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "product not found" });
  }
};
const filterProducts = async (req, res) => {
  const { filter, value } = req.body;
  if (filter == "category") {
    const validCategories = [
      "DOG SUPPLIES",
      "CAT SUPPLIES",
      "BIRD SUPPLIES",
      "FISH SUPPLIES",
      "SMALL ANIMAL SUPPLIES",
      "ACCESSORIES",
      "OTHERS",
    ];
    if (!validCategories.includes(value)) {
      return res.status(400).send({ message: "category does not exist" });
    }
    try {
      const filteredProducts = [];
      const products = await Product.find();
      products.map((product) => {
        if (product.category == value) filteredProducts.push(product);
      });
      if (filteredProducts.length == 0) {
        return res.status(204).send({ message: "no products found" });
      }
      return res.status(200).send({ filteredProducts: filteredProducts });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  if (filter == "price") {
  }
  if (filter == "name") {
  }
  return res.status(404).send({ message: "filter not found" });
};
const productStats = async (req, res) => {};

module.exports = {
  addProduct,
  editProduct,
  getAllproducts,
  getProduct,
  deleteProduct,
  filterProducts,
  productStats,
};
