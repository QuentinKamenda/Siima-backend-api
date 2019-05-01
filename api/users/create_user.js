// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
//const helperFirebase = require("../../helpers/firebase");

const User = require("../../models/user/user");
var firebase = require("firebase");

module.exports.call = function (req, res) {

    let functionName = "create-user";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let userInformation = new User({
            username: req.body.username,
            mail: req.body.mail
          });
          return userInformation;
      })
      .then(userInfo => {
        console.log(userInfo);
          userInfo.save().then(userInfo => {
          //helperFirebase.signup(req, res);
          firebase.auth().createUserWithEmailAndPassword(req.body.mail, req.body.password).then(userInfo => {
              let response = {
                status: "success",
                message: "user created",
                userInformation: userInfo
              };
              console.log(functionName + " - User " + req.body.mail + " created.")
              res.json(response);
          })
          .catch(error => {
              console.log(`Error caught in ` + functionName + ` - ${error.message}`);
              errorHandler.handleError(req, res, error);
          });
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      });
    })
    .catch(error => {
        console.log(`Error caught in ` + functionName + ` - ${error.message}`);
        errorHandler.handleError(req, res, error);
    });
};
