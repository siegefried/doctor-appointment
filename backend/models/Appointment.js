const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
});

module.exports = model("Appointment", appointmentSchema);
