const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

const registerCustomer = asyncHandler(async (req, res) => {
  console.log("here is the request body", req.body);
  const {
    firstName,
    lastName,
    phoneNumber,
    woreda,
    subcity,
    officeNumber,
    department,
    floorNumber,
    elevatorNumber,
  } = req.body;
  const customer = await Customer.create({
    FirstName: firstName,
    LastName: lastName,
    Woreda: woreda,
    SubCity: subcity,
    OfficeNumber: officeNumber,
    PhoneNumber: phoneNumber,
    FloorNumber: floorNumber,
    Department: department,
    ElevatorNumber: elevatorNumber,
  });
  if (customer) {
    const Customers = await Customer.find();
    res.status(200).json(Customers);
  } else {
    res.status(409);
  }
});
module.exports = {
  registerCustomer,
};
