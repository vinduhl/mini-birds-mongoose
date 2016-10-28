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
  console.log('POST sighting');
  new Sighting(req.body).save( (err, sighting) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sighting);
  });
});

app.get('/api/sighting/', function(req, res) {
  console.log('GET sighting');
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
  console.log('DELETE sighting');
  res.end();
});

app.put('/api/sighting', function(req, res) {
  console.log('PUT sighting');
  res.end();
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
