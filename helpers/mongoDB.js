const mongoose = require('mongoose');

module.exports.initMongoDBConnection = function (nameOfDataBase) {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/siima_db');
  mongoose.connection.once('open', function(){
      console.log('Connection has been made to siima_db');
  }).on('error', function(error){
      console.log('Connection error: mongoDB', error);
  });
  return mongoose.connection;
}
