const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please add a  First name"],
    },
    LastName: {
      type: String,
      required: [true, "Please add a Last Name"],
    },
    PhoneNumber: {
      type: String,
    },
    Woreda: {
      type: String,
      required: [true, "Please add an email"],
    },
    SubCity: {
      type: Number,
    },
    OfficeNumber: {
      type: String,
      required: [true, "Please add a password"],
    },
    Department: {
      type: String,
      required: [true, "Please add a password"],
    },
    FloorNumber: {
      type: Number,
    },
    ElevatorNumber: {
        type: String,
        required: [true, "Please add a password"],
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);