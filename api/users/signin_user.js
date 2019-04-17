const helper_firebase = require("../../helpers/firebase");

 module.exports.call = function (req, res) {

    let functionName = 'signin-user';

    helper_firebase.signin(req.body.email,req.body.pwd)
     .then(() => {
       let response = {
         status: "success",
         message: "user signed in",
         userInformation: req.body.email
       };
       res.json(response);
     })
       .catch(error => {
       console.log(`Error caught in ` + functionName + ` - ${error.message}`);
       errorHandler.handleError(req, res, error);
     });
 };
