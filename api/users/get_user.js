// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const User = require("../../models/user");

module.exports.call = function (req, res) {

    let functionName = "get-user";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let userId ={
            _id: req.params.userId
          };
          return userId;
      })
      .then(userId => {
        console.log(userId);
          User.findOne(userId).then(result => {
            if (result === null) {
              result = {error: "No user found"};
            }
            return result;
          })
          .then(userInfo => {
              res.json(userInfo);
          })
        })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
