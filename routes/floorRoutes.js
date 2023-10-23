const express = require("express");
const router = express.Router();

const {
  registerFloor,
  getFloors,
  updateFloor,
} = require("../controllers/floorController");

router.post("/", registerFloor);
router.get("/", getFloors);
router.put("/", updateFloor);

module.exports = router;
