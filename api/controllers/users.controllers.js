const { request, response } = require("express");
const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT.helpers");

const getBudgetUser = async (req = request, res = response) => {
  try {
    const { uid: user } = req.user;

    const result = await User.getTotalBudget({ user: parseInt(user, 10) });

    if (!result) return res.status(502).json({ msg: "Internal server error." });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const signIn = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail({ email });

    if (!user)
      return res
        .status(401)
        .json({ msg: "Wrong email or password, try again.", errcode: 20 });

    // Validate password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res
        .status(401)
        .json({ msg: "Wrong email or password, try again.", errcode: 20 });

    // If everything success then generate the token
    const token = await generateJWT(user.uid);

    return res.json({ ok: true, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", errcode: 21 });
  }
};

const postUser = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const newUser = new User({ email, password });

    const user = await User.getUserByEmail({ email });

    if (user)
      return res
        .status(400)
        .json({ msg: "This email already exists.", errcode: 22 });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await User.postUser(newUser);

    return res.json({
      ok: true,
      msg: "Successful register.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error.", errcode: 21 });
  }
};

module.exports = {
  signIn,
  postUser,
  getBudgetUser,
};
