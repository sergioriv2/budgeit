const {
  spGetUserByEmail,
  spGetUserBudget,
  cmdPostUser,
  spGetUserById,
} = require("../database/commands/users.database");

const User = function (user) {
  this.uid = user.uid;
  this.email = user.email;
  this.password = user.password;
  this.budget = user.budget;
};

User.getTotalBudget = async (params) => {
  try {
    const response = await spGetUserBudget(params);
    return response[0];
  } catch (err) {
    throw new Error(err);
  }
};

User.getUserById = async (params) => {
  try {
    const response = await spGetUserById(params);
    return response[0];
  } catch (err) {
    throw new Error(err);
  }
};

User.getUserByEmail = async (params) => {
  try {
    const response = await spGetUserByEmail(params);
    return response[0];
  } catch (err) {
    throw new Error(err);
  }
};

User.postUser = async (user) => {
  try {
    const { affectedRows } = await cmdPostUser(user);
    return affectedRows === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = User;
