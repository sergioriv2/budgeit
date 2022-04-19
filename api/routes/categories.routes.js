const { Router } = require("express");

const { validateJWT } = require("../middlewares");

const router = Router();

const { getCategories } = require("../controllers/categories.controllers");

// GET

router.get("/", [validateJWT], getCategories);

// POST

// PUT

module.exports = router;
