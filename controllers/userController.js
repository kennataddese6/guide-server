const ROLES_LIST = require("../config/roles_list");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, floorNumber, role } =
    req.body;

  const userExist = await User.findOne({ Email: email });
  if (userExist) {
    res.status(401).json("Email is already taken");
  } else {
    const user = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Roles: role,
      PhoneNumber: phoneNumber,
      FloorNumber: floorNumber,
      Password: "Welcome2cbe",
      LatestMessage: "",
    });
    if (user) {
      res.status(200).json(user);
    } else {
      console.log("somethingwent wrong");
    }
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, PloorNumber, Role, id } =
    req.body;
  console.log(
    "here is the data",
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    FirstName,
    Role,
    id
  );
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
const getUsers = asyncHandler(async (req, res) => {
  const Users = await User.find().sort({
    updatedAt: -1,
  });
  res.status(200).json(Users);
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
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.body.Id });
  if (user) {
    if (user.Password === req.body.currentPassword) {
      user.Password = await req.body.newPassword;
      await user.save();
      res.status(200).json("Password Changed Successfully.");
    } else {
      res.status(401).json("Incorrect Password");
    }
  } else {
    res.status(404).json("User not found");
  }
});
const ResetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ Email: req.body.email });
  if (user) {
    const resettedPassword = "Welcome2cbe";
    user.Password = await resettedPassword;
    await user.save();
    res.status(200).json("Password Changed Successfully.");
  } else {
    res.status(404).json("User not found");
  }
});
module.exports = {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
  login,
  changePassword,
  getUsers,
  ResetPassword,
  updateUser,
};
