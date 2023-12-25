const User = require("../models/user.model");
const path = require("path");
const addProductToCart = async (req, res) => {};
const updateUser = async (req, res) => {
  let {
    name = req.user.name,
    phone = req.user.phone,
    address = req.user.address,
    userType = req.user.userType,
    image = req.user.image,
  } = req.body;
  const userID = req.user._id;
  try {
    //phone validation
    if (phone.length < 8) {
      return res.status(400).send({ message: "invalid phone number" });
    }

    //address validation
    if (address.length < 10) {
      return res.status(400).send({ message: "address not detailed enough" });
    }

    //name validation and correction
    const trimmedName = name.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName);
    if (!hasValidName) {
      return res.status(400).send({ message: "incomplete name" });
    }
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    name = capitalizedNames.join(" ");
    //image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/users",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });

      image = imageName;
    }
    //update
    await User.findByIdAndUpdate(userID, {
      name,
      phone,
      address,
      userType,
      image,
    });
    res.status(200).send({ message: "user updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};
const getCart = async (req, res) => {};
const emptyCart = async (req, res) => {};

module.exports = {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
};
