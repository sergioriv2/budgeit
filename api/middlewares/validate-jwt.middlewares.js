const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/users.models");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-api-key");

  if (!token) {
    return res.status(401).json({ msg: "Error: Valid token required." });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Verifico si el usuario existe
    const user = await User.getUserById({ uid });
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {
  validateJWT,
};
