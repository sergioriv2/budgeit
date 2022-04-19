const Category = require("../models/categories.models");

const getCategories = async (req = request, res = response) => {
  try {
    const result = await Category.getCategories();

    if (!result) return res.status(502).json({ msg: "Internal server error." });

    return res.status(200).json({ ok: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = {
  getCategories,
};
