var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var Mongo = require('mongodb');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('home');
})

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'TB Registration' });
});

router.post('/register/submit', function(req, res, next) {
  console.log(req.body);

  var user = new User(req.body);

  user.insert(function() {
    if(user._id) {
      var name = user.firstname;
      console.log(name + " added to Database!");
      user.sendToClear(function(success){
          if(success) {
            console.log("New user added to Clear! " + name);
            res.render('success', {name: name});
          } else {
            console.log(name + " unable to be added to Clear...");
            res.render('error', {error: 'Not added to clear'});
          }
        });
    } else {
      console.log("ERROR adding user to Database and Clear...");
      res.render('error', {error: 'This E-mail has already been registered.'});
    }
  });

  /*
  user.insert(function(){
    if(user._id){
      console.log("New user added! " + user.firstname + " " + user.lastname);
    } else {
      console.log("ERROR adding user");
    }
  })
  */
});

module.exports = router;
