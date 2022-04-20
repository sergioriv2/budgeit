const {
  cmdPostOperation,
  cmdGetOperationsPaginated,
  spPutOperation,
  spDeleteOperation,
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
    const { affectedRows } = await cmdPostOperation(operation);

    return affectedRows === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

Operation.deleteOperation = async (operation) => {
  try {
    const { affectedRows } = await spDeleteOperation(operation);

    return affectedRows === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

Operation.getOperations = async (params) => {
  try {
    const result = await cmdGetOperationsPaginated(params);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

Operation.putOperation = async (params) => {
  try {
    const { affectedRows } = await spPutOperation(params);
    return affectedRows === 1 ? true : false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Operation;
