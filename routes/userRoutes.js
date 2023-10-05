const express = require("express");
const router = express.Router();

const {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
  login,
  changePassword,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/ChangePassword", changePassword);
router.post("/login", login);
router.get("/floorReceptionists", getFloorReceptionists);
router.put("/latestMessage", updateLatestMessage);

module.exports = router;
