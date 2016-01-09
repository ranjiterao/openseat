var Q = require('q');
var User = require('./usersModel');

var findAll = Q.nbind(User.find, User);
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  getUsers: function(req, res, next){
    findAll()
      .then(function(users){
        res.status(200).json(users);
      })
      .fail(function(error){
        next(error);
      });
  },

  getUser: function(req, res, next){
    var userId = req.params.id;
    findUser({ _id: userId })
      .then(function(user){
        res.status(200).json(user);
      })
      .fail(function(error){
        next(error);
      });
  },

  findByFacebookId: function(id){
    return findUser({facebookId: id});
  },

  create: function(user){
    return createUser(user);
  },

  insertTestData: function(req, res, next){
    createUser({
      facebookId: "1",
      name: "Tim Cook",
      email: "test@test.com",
      picture: "http://images.apple.com/pr/bios/images/cook_thumb.jpg",
      phoneNumber: "4168906789",
      IsDriver: true
    })
    .then(function(newUser){
    })
    .fail(function (error) {
      next(error);
    });

    createUser({
      facebookId: "2",
      name: "Leonel Messi",
      email: "test@test.com",
      picture: "http://images.apple.com/pr/bios/images/cook_thumb.jpg",
      phoneNumber: "4168906789",
      IsDriver: true
    })
    .then(function(newUser){
    })
    .fail(function (error) {
      next(error);
    });

    return res.sendStatus(200);
  }
};