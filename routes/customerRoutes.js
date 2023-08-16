const express = require("express");
const router = express.Router();

const { registerCustomer } = require("../controllers/customerController");

router.post("/", registerCustomer);
module.exports = router;