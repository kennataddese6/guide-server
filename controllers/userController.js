const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { FirstName, LastName, email, password } = req.body;
  console.log("here is the data", req.body);
  /*   const user = await User.create({
    f,
  });
  res.status(200).json(user); */
});
module.exports = {
  registerUser,
};
