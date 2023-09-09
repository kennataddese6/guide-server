const express = require("express");
const router = express.Router();

const { registerFloor} = require("../controllers/floorController");

router.post("/", registerFloor);

module.exports = router;
