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
    return res.status(200).json({ message: "User registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const index = async (req, res) => {
  const { query } = req;
  try {
    const users = await User.find(query);
    return res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getCurrentUser = async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = { create, index, getCurrentUser };
