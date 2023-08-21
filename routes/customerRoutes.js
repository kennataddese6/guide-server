const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomers,
  getFloorCustomers,
  updateCustomer,
} = require("../controllers/customerController");

router.post("/", registerCustomer);
router.get("/", getCustomers);
router.put("/", updateCustomer);

router.get("/floorCustomers", getFloorCustomers);
module.exports = router;
