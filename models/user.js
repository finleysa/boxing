module.exports = User;
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var $ = require('jquery');

function User(user){
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.bithdate = user.birthdate;
  this.address = user.address;
  this.state = user.state;
  this.city = user.city;
  this.zip = user.zip;
  this.email = user.email;
  this.homephone = user.homephone;
  this.cellphone = user.cellphone;
  this.concent = user.concent;
  this.date = new Date();
}

User.prototype.sendToClear = function(fn){
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open("https://clear.titleboxingclub.com/", function(status) {
        console.log("Title Boxing accessed: ", status);

        return page.evaluate((function() {
          var login = $('#ctl00_cphBody_tbID').val();
          var password = $('ctl00$cphBody$tbPWD').val();
        }), function(result) {
          console.log('Page title is ' + result);
          return ph.exit();
        });
      });
    });
  });
  fn(true);
}

/*
User.prototype.insert = function(fn){
  var self = this;

  users.findOne({email:self.email}, function(err, record){
    if(!record){
      users.insert(self, function(err, records){
        fn(err);
      });
    }else{
      fn(err);
    }
  });
};

User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);

  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};
*/
