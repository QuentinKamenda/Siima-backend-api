// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const User = require("../../models/user/user");

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
          User.findOne(userId).then(rslt => {
            if (rslt === null) {
              result = {
                status: "fail",
                message: "No user found with this id"
              };
              res.status(400);
            }
            else {
              result = {
                status: "success",
                message: "User retrieved",
                user: rslt
              }
              res.status(200);
            }
            res.json(result);
          })
        })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
