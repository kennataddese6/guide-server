const express = require("express");
const router = express.Router();

const {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
} = require("../controllers/userController");

router.post("/", registerUser);
router.get("/floorReceptionists", getFloorReceptionists);
router.get("/latestMessage", updateLatestMessage);

module.exports = router;
