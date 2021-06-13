const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
    },
    ContactNumber: [
      {
        type: String,
      },
    ],
    Address: {
      Line1: {
        type: String,
      },
      HouseNumber: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("user", userSchema);