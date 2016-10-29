var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Sighting = require("./sightings");
var Bird = require("./bird");
var User = require("./user");

var app = express();
app.use(bodyParser.json());

var port = 3000;

mongoose.connect("mongodb://localhost:27017/birds-mongoose-2");
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
    promise = allSightings.where("status").equals(req.query.status).populate("bird").populate("user").exec();
  } else {
    promise = allSightings.populate("bird").populate("user").exec();
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

// TODO: change this
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


app.post('/api/users', function(req, res) {
  new User(req.body).save( (err, user) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(user);
  });
});

app.get('/api/users', function(req, res) {
  User.find().then( (err, users) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(users);
  });
});

app.post('/api/birds', function(req, res) {
  new Bird(req.body).save( (err, bird) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(bird);
  });
});

app.get('/api/birds', function(req, res) {
  Bird.find().then( (err, birds) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(birds);
  });
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
