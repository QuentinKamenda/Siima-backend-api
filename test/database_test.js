const assert = require('assert');
const User = require('../models/user');

// Describe our tests
describe('Saving, finding and modifying Users', function(){

  // Create tests
  it('Saves a User to the database', function(done){

    const user = new User({
      name: 'name',
      email:  'email@siima.com',
      password:'password',
      activated:true
    });

    user.save().then(function(){
      assert(!user.isNew);
      done();
    });

  });

  it('modifie element in database by email', function(done){

    const user = new User({
      name: 'name',
      email:  'email@siima.com',
      password:'password',
      activated:true
    });

    user.save().then(function(){
      User.findOne({name: 'email'}).then(function(result){
        assert(result.email === 'email@siima.com');
        console.log(result.email === 'email@siima.com');
        done();
      });
    });
  });

});
