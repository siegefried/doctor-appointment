const { Schema, model } = require("mongoose");
const { hash } = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contact: { type: String, required: [true, "A contact number is required"] },
    password: { type: String, required: [true, "Password is required"] },
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last bname is required"] },
    role: { type: String, enum: ["user", "doctor", "admin"], required: true },
    readNotifications: { type: Array, default: [] },
    unReadNotifications: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 12);
  }
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

module.exports = model("User", userSchema);
