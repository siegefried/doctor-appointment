const express = require("express");
const router = express.Router();
const DoctorsController = require("../controllers/DoctorsController");
const validator = require("../middleware/doctorValidator");

router.post("/", validator.add, DoctorsController.create);
router.get("/", DoctorsController.index);

module.exports = router;