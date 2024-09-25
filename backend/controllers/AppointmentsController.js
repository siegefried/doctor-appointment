const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

const create = async (req, res) => {
  const data = req.body;
  try {
    const appointment = await Appointment.create(data);
    const doctor = await Doctor.findById(appointment.doctorId);
    const doctorUser = await User.findById(doctor.userId);
    const patient = await User.findById(appointment.userId);
    doctorUser.unReadNotifications.push({
      type: "new-appointment-request",
      message: `New appointment request from ${patient.firstName} ${patient.lastName}`,
      onClickPath: "/doctor/appointments",
    });
    await doctorUser.save();
    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { create };
