var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function updateUser(userId, newUser) {
  console.log("updating user")
  return userModel.update({_id: userId},
          {$set: newUser})
}

function findUserByCredentials(username, password) {
  return userModel.findOne({
       username: username, password: password
  })
}

function findUserByUsername(username) {
  console.log("finding by username!")
  return userModel.findOne({username: username});
}

function register(user) {
  return userModel.create(user);
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  updateUser: updateUser,
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  register: register,
  deleteUser: deleteUser
};

module.exports = api;