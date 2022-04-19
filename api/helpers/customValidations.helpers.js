const isValidNumber = (number = "") => {
  if (number <= 0) throw new Error("Number must be grater than zero.");
  else return true;
};

module.exports = {
  isValidNumber,
};
