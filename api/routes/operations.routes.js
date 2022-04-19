const { Router } = require("express");
const {
  postOperation,
  getOperations,
} = require("../controllers/operations.controllers");
const { validateJWT, validateFields } = require("../middlewares");
const { check } = require("express-validator");
const { isValidNumber } = require("../helpers/customValidations.helpers");

const router = Router();

// POST

router.post(
  "/",
  [
    validateJWT,
    check("user_uid", `'user_uid' field is required.`)
      .notEmpty()
      .isInt()
      .withMessage(`'user_uid' must be a number.`),
    check("type_uid", `'type_uid' field is required.`)
      .notEmpty()
      .isInt()
      .withMessage(`'type_uid' must be a number.`),
    check("category_uid", `'category_uid' must be a number.`)
      .isInt()
      .optional({ nullable: true }),
    check("amount", `'amount' field is required.`)
      .notEmpty()
      .custom((amount) => isValidNumber(amount)),
    validateFields,
  ],
  postOperation
);

// GET

router.get("/user/:user_uid", getOperations);

// PUT

// DELETE

module.exports = router;
