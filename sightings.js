const mongoose = require("mongoose");

const Sighting = new mongoose.Schema( {

  confirmed: {type: Boolean, default: false},
  numberSeen: {type: Number, required: true, min: 1 },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  bird: [{type: mongoose.Schema.Types.ObjectId, ref: "Bird"}]
});


module.exports = mongoose.model("Sighting", Sighting);
