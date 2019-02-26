const helper_firebase = require("../../helpers/firebase");

 module.exports.call = function (req, res) {

    helper_firebase.signin(req.body.email,req.body.pwd);
    console.log("sign in " + req.body.email);

 };
