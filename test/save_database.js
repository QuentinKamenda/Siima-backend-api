const assert = require('assert');
const User = require('../models/user');

// Describe our tests
describe('Saving Users', function(){

  // Create tests
  it('Saves a User to the database', function(done){

    const user = new User({
      name: 'jean',
      email:  'hihimail',
      password:'friend in elvish',
      activated:true
    });

    user.save().then(function(){
      assert(!user.isNew);
      done();
    });

  });

});
