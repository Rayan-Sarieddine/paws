const User = require("../models/user.model");
const Product = require("../models/product.model");

const addProductToCart = async (req, res) => {
  const userID = req.user._id;
  const { productID, quantity } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const cartItemIndex = user.cart.items.findIndex((item) =>
      item.productID.equals(productID)
    );

    if (cartItemIndex > -1) {
      user.cart.items[cartItemIndex].quantity += quantity;
      user.cart.items[cartItemIndex].total =
        user.cart.items[cartItemIndex].quantity * product.price;
    } else {
      user.cart.items.push({
        productID: product._id,
        quantity: quantity,
        total: quantity * product.price,
      });
    }

    await user.save();
    res.status(200).send({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};
const updateUser = async (req, res) => {
  let {
    name = req.user.name,
    phone = req.user.phone,
    address = req.user.address,
    userType = req.user.userType,
    image = req.user.image,
    password = "",
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
