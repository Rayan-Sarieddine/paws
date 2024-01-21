const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//Middleware to authenticate that user is logged in and send their details to req
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(403).send("Forbidden");
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: { exclude: ["password"] },
    });
    req.user = user;
    next();
  }
};

module.exports = {
  authMiddleware,
};
