const User = require("../models/user.model");
const Product = require("../models/product.model");
const bcrypt = require("bcrypt");
const path = require("path");
const addProductToCart = async (req, res) => {
  const userID = req.user._id;
  const { productID, quantity, productImage } = req.body;

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
      user.cart.items[cartItemIndex].quantity += parseInt(quantity);
      user.cart.items[cartItemIndex].total =
        user.cart.items[cartItemIndex].quantity * product.price;
    } else {
      user.cart.items.push({
        productID: product._id,
        quantity: quantity,
        productImage: productImage,
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
const editCart = async (req, res) => {
  const userID = req.user._id;
  const { cartItems } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart.items = cartItems;

    await user.save();
    res
      .status(200)
      .send({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
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
const getCart = async (req, res) => {
  const userID = req.user._id;
  try {
    const user = await User.findById(userID).populate(
      "cart.items.productID",
      "name barcode price"
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.cart.items.length === 0) {
      return res.status(204).send({ message: "User cart is empty" });
    } else {
      const tempGrouping = {};

      user.cart.items.forEach((item) => {
        const id = item.productID._id.toString();
        if (!tempGrouping[id]) {
          tempGrouping[id] = { ...item.toObject(), quantity: 0, total: 0 };
        }
        tempGrouping[id].quantity += item.quantity;
        tempGrouping[id].total += item.total;
      });

      const groupedCartItems = Object.keys(tempGrouping).map(
        (key) => tempGrouping[key]
      );

      return res.status(200).send({
        message: "Items retrieved successfully",
        cartItems: groupedCartItems,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
const emptyCart = async (req, res) => {
  const userID = req.user._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndUpdate(userID, {
      $set: { "cart.items": [] },
    });
    res.status(200).send({ message: "cart emptied successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error", error });
  }
};

//chat
const createChatSession = async (req, res) => {
  const userId = req.user._id;
  const { adminId, chatId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const newChatSession = {
      userId,
      adminId,
      chatId,
    };

    user.chatSessions.push(newChatSession);
    await user.save();

    res
      .status(201)
      .send({ message: "Chat session created", chatSession: newChatSession });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};
const getAllChatSession = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.chatSessions.length == 0) {
      return res.status(204).send({ message: "user has no chat sessions" });
    } else {
      res.status(200).send({
        message: "chat sessions retreived",
        chatsession: user.chatSessions,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error" });
  }
};

const deleteChatSession = async (req, res) => {
  const userId = req.user._id;
  const { chatId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const chatSessionIndex = user.chatSessions.findIndex(
      (session) => session.chatId === chatId
    );

    if (chatSessionIndex === -1) {
      return res.status(404).send({ message: "Chat session not found" });
    }

    user.chatSessions.splice(chatSessionIndex, 1);
    await user.save();

    res.status(200).send({ message: "Chat session deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
  createChatSession,
  getAllChatSession,
  deleteChatSession,
  editCart,
};
