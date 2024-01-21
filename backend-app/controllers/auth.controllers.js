const User = require("../models/user.model");

//JWT dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Function to login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
      return res.status(401).send({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: "invalid credentials" });
    }
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
    return res.status(500).send({ message: error.message });
  }
};

//Function to register a new user
const register = async (req, res) => {
  let { email, password, name } = req.body;

  //missing parameters validation
  if (!email || !password || !name) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).send({ message: "email already exists" });
    }

    //passsword validation
    if (password.length < 5) {
      return res
        .status(400)
        .send({ message: "Password must be at least 5 characters long" });
    }

    //name validation and correction
    const trimmedName = name.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName); // Name to be having at least one space in middle (first name and last name)
    if (!hasValidName) {
      return res.status(400).send({ message: "incomplete name" });
    }
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1) //Capitalize name parts
    );
    name = capitalizedNames.join(" ");

    //registration
    const user = await User.create({
      email: email,
      password: password,
      name: name,
    });
    return res.status(200).send({ user, status: "success" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
