const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const validator = require("../middleware/userValidator");
const { verifyToken } = require("../middleware/auth");

router.post("/register", validator.add, UsersController.create);
router.get("/", UsersController.index); //should add a middleware for admin and doctor auth
router.get("/current-user", verifyToken, UsersController.getCurrentUser);

module.exports = router;