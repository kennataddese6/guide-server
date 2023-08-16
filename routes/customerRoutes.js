const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  getCustomers,
} = require("../controllers/customerController");

router.post("/", registerCustomer);
router.get("/", getCustomers);
module.exports = router;
