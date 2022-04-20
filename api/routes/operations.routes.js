const { Router } = require("express");
const {
  postOperation,
  getOperations,
  putOperation,
  deleteOperation,
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
    check("type_uid", `'type_uid' field is required.`)
      .notEmpty()
      .isInt()
      .withMessage(`'type_uid' must be a number.`),
    check("description", `'description' field is required.`)
      .notEmpty()
      .isString()
      .withMessage(`'description' must be a string.`),
    check("date", `'date' field is required.`).notEmpty(),
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

router.get("/", [validateJWT], getOperations);

// PUT

router.put(
  "/",
  [
    validateJWT,
    check("operation_uid", `'operation_uid' is required.`)
      .notEmpty()
      .isInt()
      .withMessage(`'operation_uid' must be a number.`),
    check("description", `'description' must be a string.`).isString(),
    check("category_uid", `'category_uid' must be a number.`).isInt(),
    check("amount", `'amount' field is required.`).custom((amount) =>
      isValidNumber(amount)
    ),
    validateFields,
  ],
  putOperation
);

// DELETE

router.delete(
  "/",
  [
    validateJWT,
    check("operation_uid", `'operation_uid' is required.`)
      .notEmpty()
      .isInt()
      .withMessage(`'operation_uid' must be a number.`),
    validateFields,
  ],
  deleteOperation
);

module.exports = router;
