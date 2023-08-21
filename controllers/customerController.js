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
    Status: "none",
    Waiting: true,
    Accepted: false,
    Sent: false,
    Arrived: false,
  });
  if (customer) {
    const Customers = await Customer.find();
    res.status(200).json(Customers.reverse());
  } else {
    res.status(409);
  }
});
const getCustomers = asyncHandler(async (req, res) => {
  const Customers = await Customer.find();
  res.status(200).json(Customers.reverse());
});
const getFloorCustomers = asyncHandler(async (req, res) => {
  const Floor = req.query.floorNumber;
  const Customers = await Customer.find({ FloorNumber: Floor });
  res.status(200).json(Customers.reverse());
});
const updateCustomer = asyncHandler(async (req, res) => {
  console.log("here is the req. body", req.body);
});
module.exports = {
  registerCustomer,
  getCustomers,
  getFloorCustomers,
  updateCustomer,
};
