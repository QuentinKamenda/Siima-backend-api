const helper_firebase = require("../../helpers/firebase");

 module.exports.call = function (req, res) {

    let functionName = 'delete-user';

    let errorMessage = helper_firebase.updatepwd(req.body.pwd)
     .then(() => {
       let response = {
         status: "success",
         message: "password set",
       };
       res.json(response);
     })
       .catch(error => {
       console.log(`Error caught in ` + functionName + ` - ${errorMessage}`);
       errorHandler.handleError(req, res, error);
     });

 }
