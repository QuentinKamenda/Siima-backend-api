const User = require('../../models/user');
module.exports.call = function (req, res) {
  var user;

  user = new User({
    email: req.body.email,
    password:'highly crypted password',
    activated:true
  });
  user.name="salut";

  user.save().then(function(){
    console.log('user is log');
  });
};
