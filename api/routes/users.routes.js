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

router.get("/budget", [validateJWT], getBudgetUser);

// POST

router.post("/signin", signIn);

router.post(
  "/",
  [
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
