const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send({ message: "invalid credentials" });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "invalid credentials" });

  const { password: hashedPassword, ...userDetails } = user.toJSON();
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "2 days" }
  );
  res.status(200).send({ user: userDetails, token: token, status: "success" });
};
const register = async (req, res) => {
  const { email, password, name, phone, address, userType } = req.body;
  if (!email || !password || !name || !phone || !address) {
    res.status(400).send({ message: "all fileds are required" });
  }
  if (!userType) {
    let userType = "USER";
  }
  try {
    const user = new User({
      email,
      password,
      name,
      phone,
      address,
      userType,
    });
    await user.save();
    res.status(200).send({ user, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};
const updateUser = async (req, res) => {};
const getCart = async (req, res) => {};
const emptyCart = async (req, res) => {};
const addProductToCart = async (req, res) => {};

module.exports = {
  login,
  register,
  updateUser,
  getCart,
  emptyCart,
  addProductToCart,
};
