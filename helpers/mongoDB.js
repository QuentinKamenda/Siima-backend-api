const mongoose = require('mongoose');
const config = require("./config");

module.exports.initMongoDBConnection = function () {
  return new Promise(function(resolve, reject){
    mongoose.Promise = global.Promise;
    config.get('url').then((result)=>{
      console.log(result);
      mongoose.connect(result);
      mongoose.connection.once('open', function(){
          console.log('Connection has been made to siima_db');
          resolve(mongoose.connection);
      }).on('error', function(error){
          console.log('Connection error: mongoDB', error);
      });
    });
  });
};
