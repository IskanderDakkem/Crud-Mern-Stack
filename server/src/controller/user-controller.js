"use strict";
//----------------------------------------------------------------------------
const User = require("../model/user-model");
//----------------------------------------------------------------------------
const createNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    const findEmailMatch = await User.findOne({ email });
    if (findEmailMatch) {
      return res.status(409).json({ message: "Email already used" });
    }
    const findPhoneNumberMatch = await User.findOne({ phoneNumber });
    if (findPhoneNumberMatch) {
      return res.status(422).json({ message: "Phone number already used" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    const createUser = await User.create(newUser);
    if (!createUser) {
      return res.status(400).json({ message: "Failed to create product" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
const updateNewUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(406).json({ Message: "Missing params" });
    }
    const { avatar, firstName, lastName, email, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id },
      { firstName, lastName, email, phoneNumber },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Failed to update user" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
const deleteNewUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(406).json({ message: "Missing params" });
    }
    const getUser = await User.findOne({ _id });
    if (!getUser) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    const deleteUser = await User.deleteOne({ _id });
    if (!deleteUser) {
      return res.status(409).json({ message: "Failed to delete user" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
const getAllUsers = async (req, res) => {
  try {
    const getAll = (await User.find()) || [];
    return res.status(200).json({
      message: "Retrived successfully",
      items: getAll === null ? [] : getAll,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
const getOneUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(406).json({ message: "Missing params" });
    }
    const getOne = await User.findOne({ _id });
    if (!getOne) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    return res
      .status(200)
      .json({ message: "User retrieved successfully", item: getOne });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
module.exports = {
  createNewUser,
  deleteNewUser,
  getAllUsers,
  getOneUser,
  updateNewUser,
};
