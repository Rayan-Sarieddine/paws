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
  let { email, password, name, phone, address, userType = "USER" } = req.body;

  //missing parameters validation
  if (!email || !password || !name || !phone || !address) {
    res.status(400).send({ message: "all fileds are required" });
  }
  try {
    //user already exists validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "email already exists" });
    }

    //passsword validation
    if (password.length < 5) {
      return res
        .status(400)
        .send({ message: "Password must be at least 5 characters long" });
    }

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

    //registration
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

module.exports = {
  login,
  register,
};
