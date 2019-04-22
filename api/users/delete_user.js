const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");

 module.exports.call = function (req, res) {

   let functionName = 'delete-user';

    let errorMessage = helper_firebase.deleteUser()
    .then(() => {
      let response = {
        status: "success",
        message: "user deleted",
      };
      res.json(response);
    })
      .catch(error => {
      console.log(`Error caught in ` + functionName + ` - ${errorMessage}`)
      errorHandler.handleError(req, res, error);
    });



 };
