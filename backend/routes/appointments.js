const express = require("express");
const router = express.Router();
const AppointmentsController = require("../controllers/AppointmentsController");

//verifyToken implemented at server.js as all routes require authentication

router.post("/", AppointmentsController.create); //missing middleware for validation
router.post("/check-availability", AppointmentsController.checkAvailability);
router.get("/", AppointmentsController.index);
router.put("/:appointmentId", AppointmentsController.update); //missing middleware for validation and doctor auth
router.delete("/:appointmentId", AppointmentsController.destroy); //missing middleware for doctor auth

module.exports = router;
