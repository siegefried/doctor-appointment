const Doctor = require("../models/Doctor");

const create = async (req, res) => {
  const data = req.body;

  try {
    const doctorInDb = await Doctor.findOne({
      email: data.email,
    });

    if (doctorInDb) {
      return res.status(409).json({ message: "Doctor is already in db." });
    }

    const doctor = await Doctor.create(data);
    return res.status(201).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const index = async (req, res) => {
    const { query } = req;
  try {
    const doctors = await Doctor.find(query);
    return res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const show = async (req, res) => {
  const { doctorId } = req.params;
  if (!doctorId) {
    return res.status(400).json({ message: "Invalid request." });
  }
  try {
    const doctor = await Doctor.findById(doctorId);
    if (doctor === null) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { create, index, show };
