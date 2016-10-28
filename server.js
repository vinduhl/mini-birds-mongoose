var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Sighting = require("./sightings");

var app = express();
app.use(bodyParser.json());

var port = 3000;

mongoose.connect("mongodb://localhost:27017/birds-mongoose");
mongoose.connection.once("open", function() {
  console.log("Mongoose connected");
})

app.post('/api/sighting', function(req, res) {
  new Sighting(req.body).save( (err, sighting) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sighting);
  });
});

app.get('/api/sighting/', function(req, res) {
  let allSightings = Sighting.find();
  let promise = null;
  if(req.query.status) {
    promise = allSightings.where("status").equals(req.query.status).exec();
  } else {
    promise = allSightings.exec();
  }

  promise.then( (sighting, err) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sighting);
  } )

});

app.delete('/api/sighting', function(req, res) {
  Sighting.findByIdAndRemove(req.query.id, (err, deletedSighting) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(deletedSighting);
  })
});

app.put('/api/sighting', function(req, res) {
  Sighting.findByIdAndUpdate(req.query.id, { $set: { order: req.body.order }}, (err, sighting) => {
    if(err) {
      return res.status(500).json(err);
    }
    Sighting.findById(req.query.id).exec().then( (err, sighting) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(sighting);
    });

  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
