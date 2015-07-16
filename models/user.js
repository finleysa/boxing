module.exports = User;
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var exec = require('child_process').exec;

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
  this.employer = user.employer;
  this.emergencycontact = user.emergencycontact;
  this.ecphonenumber = user.ecphonenumber;
  this.classdate = user.classdate;
  this.classtime = user.classtime;
  this.referral = user.referral;
  this.concent = user.concent;
}

User.prototype.sendToClear = function(fn){
  /*
  phantom.create(function(ph) {
    return ph.createPage(function(page) {
      return page.open("https://clear.titleboxingclub.com/", function(status) {
        return page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
          return page.evaluate(function() {
            $('#ctl00_cphBody_bLogin').val("376");
            $('ctl00_cphBody_tbPWD').val("376Partners@");
            $('ctl00_cphBody_bLogin').click();
            return $('#ctl00_cphBody_bLogin').val();
          }, function(result){
              console.log(result);
              ph.exit();
          });
        });
      });
    });
  });
  */
  fs.writeFile('lib/message.txt', '')
  for(var property in this){
    if (this.hasOwnProperty(property)) {
      fs.appendFileSync('lib/message.txt', this[property] + "\n");
    }
  }
  exec('ruby ' + __dirname +'/../lib/mech.rb', function(err, stdout, stdin){
    if(err){
      console.log(err);
      fn(false);
    } else {
      console.log('Prospect added!');
      fn(true);
    }
  });
};

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
