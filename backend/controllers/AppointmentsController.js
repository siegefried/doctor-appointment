const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const dayjs = require("dayjs");
const objectSupport = require("dayjs/plugin/objectSupport.js");
const customParseFormat = require("dayjs/plugin/customParseFormat.js");
const isBetween = require("dayjs/plugin/isBetween.js");
require("dayjs/locale/en-sg");

dayjs.locale("en-sg");
dayjs.extend(objectSupport);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

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
      link: "/appointments",
    });
    await doctorUser.save();
    return res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const checkAvailability = async (req, res) => {
  const { doctorId, date, time } = req.body;
  const selectedTime = dayjs(time, "HH:mm");
  const fromTime = selectedTime.subtract(30, "minutes");
  const toTime = selectedTime.add(30, "minutes");
  try {
    const doctor = await Doctor.findById(doctorId);
    if (doctor === null) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    const scheduleObjects = doctor.schedule.map((time) => dayjs(time, "HH:mm"));
    const [startTime, endTime] = scheduleObjects;
    const lastAvailableTime = endTime.subtract(30, "minutes");
    if (
      !(
        selectedTime.isBetween(startTime, lastAvailableTime) ||
        selectedTime.isSame(startTime) ||
        selectedTime.isSame(lastAvailableTime)
      )
    ) {
      return res
        .status(409)
        .json({ message: "Appointment time is not available", success: false });
    }

    const appointments = await Appointment.find({
      doctorId,
      date,
      status: "approved",
    });

    if (appointments.length > 0) {
      const appointmentObjs = appointments.map((appointment) =>
        dayjs(appointment.time, "HH:mm")
      );
      let isAvailable = true;
      for (const appointment of appointmentObjs) {
        if (appointment.isBetween(fromTime, toTime)) {
          isAvailable = false;
          break;
        }
      }
      if (!isAvailable) {
        return res.status(409).json({
          message: "Appointment time is not available",
          success: false,
        });
      }
    }

    return res.status(200).json({
      message: "Appointment time is available",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const index = async (req, res) => {
  const { query } = req;
  try {
    const appointments = await Appointment.find(query)
      .populate("doctorId")
      .populate("userId", "firstName lastName email contact -_id");
    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const update = async (req, res) => {
  const { appointmentId } = req.params;
  const data = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const destroy = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    await Appointment.findByIdAndDelete(appointmentId);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { create, checkAvailability, index, update, destroy };
