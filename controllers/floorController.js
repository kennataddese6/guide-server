const Floor = require("../models/floorModel");
const asyncHandler = require("express-async-handler");

const registerFloor = asyncHandler(async (req, res) => {
  const floor = await Floor.create({
    WorkUnit: req.body.workUnit,
    Divsion: divison,
    Department: department,
    FloorNumber: floorNumber,
    OfficeNumber: officeNumber,
  });
  if (floor) {
    res.status(200);
  } else {
    res.status(409);
  }
});
module.exports = {
  registerFloor,
};
