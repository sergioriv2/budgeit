const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

const {
  signIn,
  postUser,
  getBudgetUser,
} = require("../controllers/users.controllers");

// GET

router.get(
  "/:user_uid/budget",
  [
    validateJWT,
    check("user_uid", "User UID is required").notEmpty(),
    validateFields,
  ],
  getBudgetUser
);

// POST

router.post("/signin", signIn);

router.post(
  "/",
  [
    validateJWT,
    check("email", "Email field is required")
      .notEmpty()
      .isEmail()
      .withMessage("Enter a valid email"),
    check("password", "Password field is required").notEmpty(),
    validateFields,
  ],
  postUser
);

// PUT

module.exports = router;
