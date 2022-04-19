const { request, response } = require("express");

const Operation = require("../models/operations.models");

const postOperation = async (req = request, res = response) => {
  try {
    const {
      user_uid: user,
      type_uid: type,
      category_uid: category,
      amount,
    } = req.body;

    const newOperation = new Operation({ user, type, category, amount });

    const { result } = await Operation.postOperation(newOperation);

    if (result) return res.status(502).json({ msg: "Internal server error." });

    return res
      .status(200)
      .json({ ok: true, msg: "Operation created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};

const getOperations = async (req = request, res = response) => {
  try {
    const { user_uid: user } = req.params;

    const { offset = 0, limit = 10 } = req.query;

    const result = await Operation.getOperations({
      user,
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10),
    });

    if (!result) return res.status(502).json({ msg: "Internal server error." });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = {
  postOperation,
  getOperations,
};
