const userCtrl = require("./userCtrl");

module.exports = app => {
  app.route("/api/users")
    .get(userCtrl.getUsers)
    .post(userCtrl.addUser)

};
