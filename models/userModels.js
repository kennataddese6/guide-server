const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please add a  First name"],
    },
    LastName: {
      type: String,
      required: [true, "Please add a Last Name"],
    },
    Email: {
      type: String,
      required: [true, "Please add an email"],
    },
    Roles: {
      type: Number,
    },
    PhoneNumber: {
      type: String,
    },
    FloorNumber: {
      type: Number,
    },

    Password: {
      type: String,
      required: [true, "Please add a password"],
    },
    LatestMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
