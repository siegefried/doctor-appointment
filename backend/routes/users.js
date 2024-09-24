const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const validator = require("../middleware/userValidator");

router.post("/register", validator.add, UsersController.create);
router.get("/", UsersController.index);

module.exports = router;