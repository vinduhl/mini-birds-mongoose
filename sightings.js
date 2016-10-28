const mongoose = require("mongoose");

const Sighting = new mongoose.Schema( {

  name: {type: String, required: true, lowercase: true, trim: true, minlength: 1},
  order: {type: String, required: true, trim: true, minlength: 1, maxlength: 20},
  status: {type: String, lowercase: true, enum: ["least concern", "least threatened", "extinct"]},
  confirmed: {type: Boolean, default: false},
  numberSeen: {type: Number, required: true, min: 1 },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  bird: {type: mongoose.Schema.Types.ObjectId, ref: "Bird"}
});


module.exports = mongoose.model("Sighting", Sighting);
