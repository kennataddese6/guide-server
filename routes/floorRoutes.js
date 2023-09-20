const express = require("express");
const router = express.Router();

const { registerFloor, getFloors } = require("../controllers/floorController");

router.post("/", registerFloor);
router.get("/", getFloors);

module.exports = router;
