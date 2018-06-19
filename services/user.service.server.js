module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.get('/api/login/loggedin', loggedIn);
  app.put('/api/profile', updateUser);
  app.delete('/api/profile', deleteUser);

  var userModel = require('../models/user/user.model.server');

  function findUserById(req, res) {
    var id = req.session['currentUser']._id;
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
    res.send(req.session['currentUser']);
    console.log("current user: ")
    console.log(req.session['currentUser']);
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
    var user = req.body;

    userModel.updateUser(user)
      .then(function (response) {
        console.log(response);
        req.session['currentUser'] = response;
        res.send(response);
      })
  }

  function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userModel.findUserByCredentials(username, password)
    .then(function (user) {
      if(user) {
        req.session['currentUser'] = user;
        res.send(user);
      } else {
        res.sendStatus(204);}
      });
  }

  function register(req, res) {
    console.log("registering!")
    var user = req.body;
    var username = req.body.username;
    var password = req.body.password;
    userModel.findUserByUsername(username)
    .then((response) => {
      if(response) {
        res.sendStatus(400);
      } else {
        console.log("weeee")
        userModel.register(user)
        .then(function (u) {
          req.session['currentUser'] = u;
          res.send(u);
        })
      }
    })
  }
  function deleteUser(req, res) {
      var userId = req.session['currentUser']._id;
      userModel.deleteUser(userId)
      .then(function (response) {
          res.send(response);
      })
  }

  function loggedIn(req, res) {
    var user = req.session['currentUser'];
    if (user === undefined) {
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }
  }

  function logout(req, res) {
     req.session.destroy();
     res.sendStatus(200);
  }
}