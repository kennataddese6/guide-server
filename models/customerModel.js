const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  postpone: {
    type: Boolean,
    required: [true, "Please add a Postpone value"],
  },
  date: {
    type: Date,
    required: [true, "Please add a Date"],
  },
});
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
      type: StatusSchema,
      required: [true, "Please add a Status"],
    },
    Waiting: {
      type: Boolean,
      required: [true, "Please add a Waiting Status"],
    },
    Accepted: {
      type: Boolean,
      required: [true, "Please add an Accepted Status"],
    },
    Sent: {
      type: Boolean,
      required: [true, "Please add a Sent Status"],
    },
    Arrived: {
      type: Boolean,
      required: [true, "Please add an Arrived Status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
