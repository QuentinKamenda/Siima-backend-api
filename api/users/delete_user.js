const helper_firebase = require("../../helpers/firebase");
const errorHandler = require("../../helpers/error_handler");

 module.exports.call = function (req, res) {

   let functionName = 'delete-user';

    let functionName = "delete-user";

    // TODO: Verify rights

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let userId ={
            _id: req.params.userId
          };
          return userId;
      })
      .then(userId => {
          User.findOne(userId).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No user found with this id"
              };
            }
            else {
              let removed = result;
              result.remove();
              let errorMessage = helper_firebase.deleteUser();
              result = {
                status: "success",
                message: "User deleted",
                removed: removed
              };
            }
            res.json(result);
          })
        })
      .catch(error => {
      console.log(`Error caught in ` + functionName + ` - ${errorMessage}`)
      errorHandler.handleError(req, res, error);
    });



 };
