const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomers,
  getFloorCustomers,
  updateCustomer,
  getSentCustomers,
  getWaitingCustomers,
} = require("../controllers/customerController");

router.post("/", registerCustomer);
router.get("/", getCustomers);
router.put("/", updateCustomer);

router.get("/floorCustomers", getFloorCustomers);
router.get("/sentCustomers", getSentCustomers);
router.get("/waitingCustomers", getWaitingCustomers);

module.exports = router;
