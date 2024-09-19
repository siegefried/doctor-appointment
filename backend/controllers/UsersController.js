const User = require("../models/User");
const { sign } = require("jsonwebtoken");
const create = async (req, res) => {
  const data = req.body;

  try {
    const userInDb = await User.findOne({
      email: data.email,
    });

    if (userInDb) {
      return res.status(409).json({ message: "User already has an account" });
    }

    const user = new User(data);
    await user.save();
    const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { create };
