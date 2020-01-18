const mongoose = require("mongoose");
const crypto = require("crypto");

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber"
    },
    resetPasswordLink: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// virtual
