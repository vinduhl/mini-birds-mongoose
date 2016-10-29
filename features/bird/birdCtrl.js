const Bird = require("./Bird");

module.exports = {
  getBirds(req, res) {
    Bird.find().then( (err, birds) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(birds);
    });
  },

  addBird(req, res) {
    new Bird(req.body).save( (err, bird) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(bird);
    });
  }

}
