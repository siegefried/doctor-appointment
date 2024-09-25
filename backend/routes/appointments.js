const express = require("express");
const router = express.Router();
const AppointmentsController = require("../controllers/AppointmentsController");

//verifyToken implemented at server.js as all routes require authentication

router.post("/", AppointmentsController.create); //missing middleware for validation

module.exports = router;