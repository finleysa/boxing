var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/boxing';
var initialized = false;

exports.connect = function(req, res, next){
  if(!initialized){
    initialized = true;
    exports.db(next);
  }else{
    next();
  }
};

exports.db = function(fn){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    global.dbCollection = {};
    global.dbCollection.db = db;
    console.log("Connected correctly to MongoDB");
    fn();
  });
};
