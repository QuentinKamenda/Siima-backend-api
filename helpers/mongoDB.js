const mongoose = require('mongoose');
const URLMongoDB = 'mongodb://localhost/siima_db';

module.exports.initMongoDBConnection = function () {
  return new Promise(function(resolve, reject){
    mongoose.Promise = global.Promise;
      mongoose.connect(URLMongoDB);
      mongoose.connection.once('open', function(){
          console.log('Connection has been made to siima_db');
          resolve(mongoose.connection);
      }).on('error', function(error){
          console.log('Connection error: mongoDB', error);
      });
  });
};
