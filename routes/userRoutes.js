const express = require("express");
const router = express.Router();

const {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
  login,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", login);
router.get("/floorReceptionists", getFloorReceptionists);
router.put("/latestMessage", updateLatestMessage);

module.exports = router;
