const {
  cmdPostOperation,
  spGetOperations,
  spPutOperation,
  spDeleteOperation,
  spGetFilteredOperations,
} = require("../database/commands/operations.database");

const Operation = function (operation) {
  this.uid = operation.uid;
  this.type = operation.type;
  this.user = operation.user;
  this.description = operation.description;
  this.category = operation.category || 16; // 16 is the uid for the "other" category
  this.amount = operation.amount;
  this.date = operation.date || Date.now();
};

Operation.postOperation = async (operation) => {
  try {
    const result = await cmdPostOperation(operation);
    return result[0] === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

Operation.deleteOperation = async (operation) => {
  try {
    const result = await spDeleteOperation(operation);
    return result[0] === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

Operation.getOperations = async (params) => {
  try {
    const result = await spGetOperations(params);
    return result || [];
  } catch (err) {
    throw new Error(err);
  }
};

Operation.getFilteredOperations = async (params) => {
  try {
    const result = await spGetFilteredOperations(params);
    return result || [];
  } catch (err) {
    throw new Error(err);
  }
};

Operation.putOperation = async (params) => {
  try {
    const result = await spPutOperation(params);
    return result[0] === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Operation;
