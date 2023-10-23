const ROLES_LIST = require("../config/roles_list");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, floorNumber, role } =
    req.body;

  const userExist = await User.findOne({ Email: email });
  if (userExist) {
    res.status(401).json("Email is already taken");
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("Welcome2cbe!", saltRounds);
    const user = await User.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Roles: role,
      PhoneNumber: phoneNumber,
      FloorNumber: floorNumber,
      Password: hashedPassword,
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
  const { FirstName, LastName, Email, PhoneNumber, FloorNumber, Role, id } =
    req.body;
  const user = await User.findOne({ _id: id });
  if (user) {
    if (Role === "Floor receptionist") {
      user.Roles = 4800;
      user.FirstName = FirstName;
      user.LastName = LastName;
      user.Email = Email;
      user.PhoneNumber = PhoneNumber;
      user.FloorNumber = FloorNumber;
      await user.save();
      const updatedUsers = await User.find().sort({
        updatedAt: -1,
      });
      res.status(200).json(updatedUsers);
    } else if (Role === "Lobby receptionist") {
      user.Roles = 1000;
      user.FloorNumber = 0;
      user.FirstName = FirstName;
      user.LastName = LastName;
      user.Email = Email;
      user.PhoneNumber = PhoneNumber;
      await user.save();
      const updatedUsers = await User.find().sort({
        updatedAt: -1,
      });
      res.status(200).json(updatedUsers);
    } else if (Role === "Admin") {
      user.Roles = 7706;
      user.FloorNumber = 0;
      user.FirstName = FirstName;
      user.LastName = LastName;
      user.Email = Email;
      user.PhoneNumber = PhoneNumber;
      await user.save();
      const updatedUsers = await User.find().sort({
        updatedAt: -1,
      });
      res.status(200).json(updatedUsers);
    } else {
      res.status(404);
      throw new Error("No role associated");
    }
  }
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ Email: req.body.email });
  if (user) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.Password
    );
    if (passwordMatch) {
      // Passwords match, authentication successful
      res.status(200).json(user);
    } else {
      // Passwords don't match
      res.status(409).json("Incorrect Email or Password");
    }
  } else {
    // User not found
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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("Welcome2cbe!", saltRounds);
    user.Password = await hashedPassword;
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
