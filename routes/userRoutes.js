const express = require("express");
const router = express.Router();

const {
  registerUser,
  getFloorReceptionists,
} = require("../controllers/userController");

router.post("/", registerUser);
router.get("/floorReceptionists", getFloorReceptionists);
module.exports = router;
