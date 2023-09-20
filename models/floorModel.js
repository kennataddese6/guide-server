const mongoose = require("mongoose");

const floorSchema = mongoose.Schema(
  {
    WorkUnit: {
      type: String,
      required: [true, "Please add a Work Unit"],
    },
    Divison: {
      type: String,
      required: [true, "Please add a Divison"],
    },
    Department: {
      type: String,
      required: [true, "Please add a Department"],
    },

    FloorNumber: {
      type: Number,
    },
    OfficeNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Floor", floorSchema);
