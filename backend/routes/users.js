const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UsersController = require("../controllers/UsersController");
const validator = require("../middleware/userValidator");

router.post("/", validator.add, UsersController.create);

module.exports = router;