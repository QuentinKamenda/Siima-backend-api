const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");

 module.exports.call = function (req, res) {

    let functionName = 'signin-user';

    helper_firebase.signin(req.body.email,req.body.pwd)
     .then(result => {
       helper_firebase.generateJwt(result).then(myJwd => {
         console.log(myJwd);
         res.status(200);
         res.json({
            "token" : myJwd
          });
       });
     })
       .catch(error => {
       console.log(`Error caught in ` + functionName + ` - ${error.message}`);
       errorHandler.handleError(req, res, error);
     });
 };
