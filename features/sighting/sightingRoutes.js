const sightingCtrl = require("./sightingCtrl");

module.exports = app => {

  app.route("/api/sighting/")
    .delete(sightingCtrl.deleteSighting)
    .put(sightingCtrl.updateSighting);

  app.route("/api/sighting")
    .get(sightingCtrl.getSightings)
    .post(sightingCtrl.addSighting);

}
