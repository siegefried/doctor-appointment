const express = require("express");
const router = express.Router();
const DoctorsController = require("../controllers/DoctorsController");
const validator = require("../middleware/doctorValidator");

router.post("/", validator.add, DoctorsController.create); //should add a middleware for admin auth
router.get("/", DoctorsController.index);
router.get("/:doctorId", DoctorsController.show);

module.exports = router;