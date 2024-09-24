const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    address: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    costPerConsult: { type: Number, required: true },
    // schedule: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Doctor", doctorSchema);
