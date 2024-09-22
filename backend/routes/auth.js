const express = require("express");
const AuthController = require("../controllers/AuthController");
const validator = require("../middleware/userValidator");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/login", validator.login, AuthController.login);
router.get("/validate-token", verifyToken, AuthController.verify);
router.post("/logout", AuthController.logout);

module.exports = router;