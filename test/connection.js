const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function(done){

    // Connect to mongodb
    mongoose.connect('mongodb://localhost/test_siima');
    mongoose.connection.once('open', function(){
        console.log('Connection has been made on test dataBase');
        done();
    }).on('error', function(error){
        console.log('Connection error: test database ', error);
    });

});

// Drop the characters collection before each test
beforeEach(function(done){
    // Drop the collection
    mongoose.connection.collections.users.drop(function(){
        done();
    });
});
