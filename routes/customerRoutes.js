const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomers,
  getFloorCustomers,
} = require("../controllers/customerController");

router.post("/", registerCustomer);
router.get("/", getCustomers);
router.get("/floorCustomers", getFloorCustomers);
module.exports = router;
