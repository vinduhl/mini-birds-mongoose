const birdCtrl = require("./birdCtrl");

module.exports = app => {
  app.route("/api/birds")
    .get(birdCtrl.getBirds)
    .post(birdCtrl.addBird)
}
