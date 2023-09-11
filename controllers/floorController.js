const Floor = require("../models/floorModel");
const asyncHandler = require("express-async-handler");

const registerFloor = asyncHandler(async (req, res) => {
  const floor = await Floor.create({
    WorkUnit: req.body.workUnit,
    Divison: req.body.divison,
    Department: req.body.department,
    FloorNumber: req.body.floorNumber,
    OfficeNumber: req.body.officeNumber,
  });
  if (floor) {
    res.status(200).json(floor);
  } else {
    res.status(409);
  }
});
const getFloors = asyncHandler(async (req, res) => {
  const Floors = await Floor.find().sort({
    updatedAt: -1,
  });
  res.status(200).json(Floors);
});
module.exports = {
  registerFloor,
  getFloors,
};
