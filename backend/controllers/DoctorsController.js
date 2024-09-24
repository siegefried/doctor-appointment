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
    return res.status(200).json(doctor);
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

module.exports = { create, index };
