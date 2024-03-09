const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:"https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?w=219&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
