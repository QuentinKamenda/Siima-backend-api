// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");


module.exports.call = function (req, res) {

    let functionName = "create-user";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let userInformation = {
            username: req.body.username,
            mail: req.body.mail
          };
          return userInformation;
      })
      .then(userInfo => {
          let response = {
            status: "success",
            message: "user created",
            userInformation: userInfo
          };
          res.json(response);
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
