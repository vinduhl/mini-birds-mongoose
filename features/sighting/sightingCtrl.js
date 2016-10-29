const Sighting = require("./Sighting");

module.exports = {
  getSightings(req, res) {
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
  },

  addSighting(req, res) {
    new Sighting(req.body).save( (err, sighting) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(sighting);
    });
  },

  deleteSighting(req, res) {
    Sighting.findByIdAndRemove(req.query.id, (err, deletedSighting) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(deletedSighting);
    })
  },

  updateSighting(req, res) {
    Sighting.findByIdAndUpdate(req.query.id, req.body, (err, sighting) => {
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
  }
}
