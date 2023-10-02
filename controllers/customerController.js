const Customer = require("../models/customerModel");
const asyncHandler = require("express-async-handler");

const registerCustomer = asyncHandler(async (req, res) => {
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
    booking,
    gender,
  } = req.body;
  console.log("Here is the gender", gender);
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
    Booking: booking,
    Gender: gender,
    Status: {
      postpone: false,
      date: new Date(),
    },
    Waiting: true,
    Accepted: false,
    Sent: false,
    Arrived: false,
  });
  if (customer) {
    const Customers = await Customer.find().sort({
      updatedAt: -1,
    });
    res.status(200).json(Customers);
  } else {
    res.status(409);
  }
});
const getCustomers = asyncHandler(async (req, res) => {
  const Customers = await Customer.find().sort({
    updatedAt: -1,
  });
  res.status(200).json(Customers);
});
const getFloorCustomers = asyncHandler(async (req, res) => {
  const Floor = req.query.floorNumber;
  const Customers = await Customer.find({ FloorNumber: Floor }).sort({
    updatedAt: -1,
  });
  res.status(200).json(Customers);
});
const getSentCustomers = asyncHandler(async (req, res) => {
  const sentCustomers = await Customer.find({ Sent: req.query.Sent }).sort({
    updatedAt: -1,
  });
  res.status(200).json(sentCustomers);
});

const getWaitingCustomers = asyncHandler(async (req, res) => {
  const WaitingCustomers = await Customer.find({ Sent: req.query.Sent }).sort({
    updatedAt: -1,
  });
  res.status(200).json(WaitingCustomers);
});
const getScheduledCustomers = asyncHandler(async (req, res) => {
  const WaitingCustomers = await Customer.find({
    "Status.postpone": true,
  }).sort({
    updatedAt: -1,
  });
  res.status(200).json(WaitingCustomers);
});
const updateCustomer = asyncHandler(async (req, res) => {
  console.log("here is the req. body", req.body);
  const Client = await Customer.findOne({ _id: req.body.ID });
  if (Client) {
    if (req.body.Sent) {
      Client.Sent = await req.body.Sent;
      await Client.save();
    }
    if (req.body.Accepted) {
      Client.Accepted = await req.body.Accepted;
      await Client.save();
    }
    if (req.body.Arrived) {
      Client.Arrived = await req.body.Arrived;
      await Client.save();
    }
    if (req.body.Postpone) {
      Client.Status.postpone = await req.body.Postpone;
      Client.Status.date = await req.body.date;
      Client.Waiting = false;
      await Client.save();
    }
    if (req.body.Waiting) {
      Client.Waiting = await req.body.Waiting;
      Client.Status.postpone = await req.body.postpone;
      await Client.save();
    }
    res.status(200).json("updated Cusotmer");
  } else {
    res.status(404).json("Customer not found");
  }
});
module.exports = {
  registerCustomer,
  getCustomers,
  getFloorCustomers,
  updateCustomer,
  getSentCustomers,
  getWaitingCustomers,
  getScheduledCustomers,
};
