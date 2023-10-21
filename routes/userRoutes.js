const express = require("express");
const router = express.Router();

const {
  registerUser,
  getFloorReceptionists,
  updateLatestMessage,
  login,
  changePassword,
  getUsers,
  ResetPassword,
  updateUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.put("/", updateUser);
router.post("/ChangePassword", changePassword);
router.post("/ResetPassword", ResetPassword);
router.post("/login", login);
router.get("/floorReceptionists", getFloorReceptionists);
router.get("/getUsers", getUsers);
router.put("/latestMessage", updateLatestMessage);

module.exports = router;
