const validateFields = require("./validate-fields.middleware");
const validateJWT = require("./validate-jwt.middlewares");

module.exports = {
  ...validateFields,
  ...validateJWT,
};
