const { request, response } = require("express");

const Operation = require("../models/operations.models");

const deleteOperation = async (req = request, res = result) => {
  try {
    const { operation_uid: uid } = req.body;

    const result = await Operation.deleteOperation({
      uid,
    });

    console.log(result);

    if (!result) return res.status(502).json({ msg: "Internal server error." });

    return res
      .status(200)
      .json({ ok: true, msg: "Operation successfully deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};

const postOperation = async (req = request, res = response) => {
  try {
    const {
      type_uid: type,
      category_uid: category,
      amount,
      date,
      description,
    } = req.body;

    const { uid: user } = req.user;

    const newOperation = new Operation({
      user,
      type,
      category,
      amount,
      date,
      description,
    });

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
    const { uid: user } = req.user;

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

const putOperation = async (req = request, res = result) => {
  try {
    const {
      category_uid: category,
      operation_uid: uid,
      description,
      amount,
      date,
    } = req.body;

    const result = await Operation.putOperation({
      uid,
      category,
      description,
      amount,
      date,
    });

    if (!result) return res.status(502).json({ msg: "Internal server error." });

    return res
      .status(200)
      .json({ ok: true, msg: "Operation edited successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = {
  postOperation,
  putOperation,
  deleteOperation,
  getOperations,
};
