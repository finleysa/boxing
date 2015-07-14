module.exports = User;
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');

function User(user){
  this.firstname = user.firstname;
  this.lastname = user.lastname
  this.address = user.address;
  this.state = user.state;
  this.city = user.city;
  this.zip = user.zip;
  this.email = user.email;
  this.homephone = user.homephone;
  this.cellphone = user.cellphone;
  this.concent = user.concent;
}

User.prototype.sendToClear = function(fn){
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open("http://www.google.com", function(status) {
        console.log("opened google? ", status);
        return page.evaluate((function() {
          return document.title;
        }), function(result) {
          console.log('Page title is ' + result);
          fn(true);
          return ph.exit();
        });
      });
    });
  });
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
