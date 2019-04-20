const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");

 module.exports.call = function (req, res) {

    let functionName = 'validate-user';

    let errorMessage = helper_firebase.sendLinkEmail()
     .then(() => {
       let response = {
         status: "success",
         message: "user email link sent",
       };
       res.json(response);
     })
       .catch(error => {
       console.log(`Error caught in ` + functionName + ` - ${errorMessage}`);
       errorHandler.handleError(req, res, error);
     });


 };
