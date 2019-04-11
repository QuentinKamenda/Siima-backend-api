const mongoose = require('mongoose');

module.exports.initMongoDBConnection = function (nameOfDataBase) {
  mongoose.Promise = global.Promise; // replace depreciated promise
  const conn = mongoose.createConnection('mongodb://localhost/'+nameOfDataBase);
  conn.once('open', function(){
      console.log('Connection has been made to '+ nameOfDataBase);
  }).on('error', function(error){
      console.log('error while connecting to the dataBase', error);
  });
  return conn;
}
