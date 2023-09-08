const ROLES_LIST = require("../config/roles_list");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, floorNumber } = req.body;

  const roles =
    floorNumber >= 1 && floorNumber <= 48
      ? ROLES_LIST.FloorReceptionist
      : floorNumber == 0
      ? ROLES_LIST.GroundReptionist
      : floorNumber < 0
      ? ROLES_LIST.VipReceptionist
      : ROLES_LIST.Admin;
  console.log("here is the data", req.body);
  const user = await User.create({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Roles: roles,
    PhoneNumber: phoneNumber,
    FloorNumber: floorNumber,
    Password: "Welcome2cbe",
    LatestMessage: "",
  });
  if (user) {
    res.status(200).json(user);
    console.log("right");
  } else {
    console.log("somethingwent wrong");
  }
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ Email: req.body.email });
  if (user) {
    if (user.Password === req.body.password) {
      res.status(200).json(user);
    } else {
      res.status(409).json("Incorrect Email or Password");
    }
  } else {
    res.status(404).json("Receptionist not found");
  }
});
const getFloorReceptionists = asyncHandler(async (req, res) => {
  const roles = req.query.roles;
  const FloorReceptionist = await User.find({ Roles: roles }).sort({
    updatedAt: -1,
  });
  res.status(200).json(FloorReceptionist);
});
const updateLatestMessage = asyncHandler(async (req, res) => {
  const LatestMessage = req.body;
  const Receptionist = await User.findOne({ FloorNumber: LatestMessage.to });
  if (Receptionist) {
    Receptionist.LatestMessage = await LatestMessage.content;
    await Receptionist.save();
    res.status(200).json("updated");
  } else {
    res.status(404).json("Receptionist not found");
  }
});
module.exports = {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
  login,
};
