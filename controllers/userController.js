const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, floorNumber } = req.body;
  console.log("here is the data", req.body);
  const user = await User.create({
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Roles: 5050,
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
