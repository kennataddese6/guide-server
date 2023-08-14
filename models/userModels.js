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
    roles: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
