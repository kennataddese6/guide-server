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
    LatestMessage:'',
  });
  if (user) {
    res.status(200).json(user);
    console.log("right");
  } else {
    console.log("somethingwent wrong");
  }
});
const getFloorReceptionists = asyncHandler(async (req, res) => {
  const roles = req.query.roles;
  const FloorReceptionist = await User.find({ Roles: roles });
  res.status(200).json(FloorReceptionist);
});
const updateLatestMessage = asyncHandler(async (req, res) => {
  const LatestMessage = req.query.LatestMessage;
  console.log('here is the latest message',req.query)
});
module.exports = {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
};
