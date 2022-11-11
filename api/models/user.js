const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-z ,.'-]*$/i.test(v); // empty is fine
      },
      message: "No special characters please",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validator for email format what i dun stole
      },
      message: "this is not an email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]{3,20}$/.test(v); // alphanumerics only, at least 3, max 20 characters
      },
      message: "between 3 and 20 chars, alphanumerics only please",
    },
  },
  img: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
