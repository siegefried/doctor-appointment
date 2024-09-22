const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require("../models/User");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verify = (req, res) => {
  res.status(200).json({ userId: req.userId });
};

const logout = (req, res) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.send();
};

module.exports = { login, verify, logout };
