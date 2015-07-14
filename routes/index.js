var express = require('express');
var router = express.Router();
var User = require('../models/user.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function(req, res, next) {
  console.log(req.body);

  var user = new User(req.body);
  user.sendToClear(function(success){
    if(success){
      var name = user.firstname + " " + user.lastname
      console.log("New user added! " + name);
      res.render('success', {name: name});
    } else {
      console.log("ERROR adding user");
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
