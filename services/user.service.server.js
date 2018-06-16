module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.put('/api/user/:userId', updateUser);
  app.post('/api/login', findUserByCredentials)
  app.post('/api/logout', logout);

  var userModel = require('../models/user/user.model.server');

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
    res.send(req.session['currentUser']);
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

  function updateUser(req, res) {
    var userId = req.params["userId"];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findUserByCredentials(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.findUserByCredentials(username, password)
    .then(function (user) {
      if(user) {
        req.session['currentUser'] = user;
        res.send(user);
      } else {
        res.send(0);}
      });
  }

  function logout(req, res) {
     req.session.destroy();
     res.send(200);
  }
}