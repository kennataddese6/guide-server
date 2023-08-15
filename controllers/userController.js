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
  });
  if (user) {
    res.status(200).json(user);
    console.log("right");
  } else {
    console.log("somethingwent wrong");
  }
});

module.exports = {
  registerUser,
};
