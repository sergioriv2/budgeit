const { spGetCategories } = require("../database/commands/categories.database");

const Category = function (category) {
  this.uid = category.uid;
  this.description = category.description;
};

Category.getCategories = async () => {
  try {
    const result = await spGetCategories();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Category;
