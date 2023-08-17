const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please add a First name"],
    },
    LastName: {
      type: String,
      required: [true, "Please add a Last Name"],
    },
    Woreda: {
      type: String,
      required: [true, "Please add Woreda"],
    },
    SubCity: {
      type: Number,
      required: [true, "Please add subCity"],
    },
    OfficeNumber: {
      type: String,
      required: [true, "Please add an Office Number"],
    },
    Department: {
      type: String,
      required: [true, "Please add a Department"],
    },
    PhoneNumber: {
      type: Number,
      required: [true, "Please add a Phone Number"],
    },
    FloorNumber: {
      type: Number,
      required: [true, "Please add a Floor Number"],
    },
    ElevatorNumber: {
      type: String,
      required: [true, "Please add an Elavator Number"],
    },
    Status: {
      type: String,
      required: [true, "Please add a Status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
