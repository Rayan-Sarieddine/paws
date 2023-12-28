const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "invalid credentials" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send({ message: "invalid credentials" });

    const { password: hashedPassword, ...userDetails } = user.toJSON();
    const token = jwt.sign(
      {
        ...userDetails,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "2 days" }
    );
    return res
      .status(200)
      .send({ user: userDetails, token: token, status: "success" });
  } catch (error) {
    return res.status(500).send({ message: "server error" });
  }
};
const register = async (req, res) => {
  let { email, password, name, phone, address, userType = "USER" } = req.body;

  //missing parameters validation
  if (!email || !password || !name || !phone || !address) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    //user already exists validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "email already exists" });
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
    return res.status(200).send({ user, status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  // New password validation
  if (newPassword.length < 5) {
    return res
      .status(400)
      .send({ message: "Password must be at least 5 characters long" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};
module.exports = {
  login,
  register,
  updatePassword,
};
