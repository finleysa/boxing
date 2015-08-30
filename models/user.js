module.exports = User;
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var twilio = require('twilio');
var Mongo = require('mongodb');
/*
var keys = fs.readFile(__dirname +'/../lib/twilio.txt', 'utf-8', function(err, data){
  return data.split(' ');
})
*/

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
  this.married = user.married;
  this.location = user.location;
  this.fitnessgoals = user.fitnessgoals;
  this.titleemployee = user.titleemployee;
  //this.concent = user.concent;
}

User.prototype.sendToClear = function(fn){
  fs.writeFile('lib/message.txt', '')
  var that = this;
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
      //sendMessage(that.cellphone);
      fn(true);
    }
  });
};

function sendMessage(cellphone) {
  //var client = new twilio.RestClient('', '');
  client.sms.messages.create({
      to: cellphone,
      from:'+',
      body:'Show this message to your local title gym for a free Power Hour!'
  }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log(error);
          console.log(message);
          console.log('Oops! There was an error.');
      }
    });
}

User.prototype.insert = function(fn){
  var self = this;
  var users = global.dbCollection.db.collection('users');
  users.findOne({email:self.email}, function(err, record){
    if(!record){
      users.insert(self, function(err, records){
        fn(err);
      });
    }else{
      users.update({email:self.email}, self, {upsert:"true"}, function(err, records){
        fn(err);
      })
    }
  });
};


User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  var users = global.dbCollection.db.collection('users');
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};
