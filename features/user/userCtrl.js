const User = require("./User");

module.exports = {
  getUsers(req, res) {
    User.find().then( (err, users) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(users);
    });
  },

  addUser(req, res) {
    new User(req.body).save( (err, user) => {
      if(err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(user);
    });
  }
}
