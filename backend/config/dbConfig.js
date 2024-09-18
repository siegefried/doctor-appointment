const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

connection.on("error", (err) => {
  console.log("Error in MongoDB connection:", err);
});

module.exports = mongoose;
