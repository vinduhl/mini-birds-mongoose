const mongoose = require("mongoose");

const Bird = new mongoose.Schema( {

  name: {type: String, required: true, lowercase: true, trim: true, minlength: 1},
  order: {type: String, required: true, trim: true, minlength: 1, maxlength: 20},
  status: {type: String, lowercase: true, enum: ["least concern", "least threatened", "extinct"]}
});


module.exports = mongoose.model("Bird", Bird);
