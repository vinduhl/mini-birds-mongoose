const mongoose = require("mongoose");
const User = new mongoose.Schema( {

  email: {type: String, required: true, lowercase: true, trim: true, minlength: 1},
  username: {type: String, required: true, trim: true, minlength: 1},
  level: {type: Number, min: 0},
  location: {type: String, required: true, trim: true, minlength: 1},
  member: {type: Boolean, default: false}
});


module.exports = mongoose.model("User", User);
