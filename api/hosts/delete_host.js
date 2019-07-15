// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Host = require("../../models/host/host");
const User = require("../../models/user/user");

module.exports.call = async function (req, res) {

    let functionName = "delete-host";

    await firebase.handleUnauthorizedError(req,res);

    if (req.payload._id === req.body.admin){
      paramCheck.checkParameters(req, functionName)
        .then(() => {
            console.log(functionName + " - Parameters checked successfully.");
            let hostId ={
              _id: req.params.hostId
            };
            return hostId;
        })
        .then(hostId => {
            Host.findOne({_id: hostId}).then(result => {
              if (result === null) {
                result = {
                  status: "fail",
                  message: "No host found with this id"
                };
                res.status(400);
              }
              else {
                if (result.admins.indexOf(req.payload._id) >= 0){
                  let removed = result;
                  for (var i = 0; i < result.admins.length; i++){
                      console.log("Removing " + result._id + " from " + result.admins[i]);
                      User.findOneAndUpdate( {_id: result.admins[i]} , { $pull : {hosts: result._id}}).then()
                  }
                  result.remove();
                  result = {
                    status: "success",
                    message: "Host deleted",
                    removed: removed
                  };
                  res.status(400);
                }
                else {
                  result = {
                    status: "fail",
                    message: "User " + req.payload._id + " not allowed to delete this host."
                  };
                  res.status(200);
                }
              }
              res.json(result);
            })
          })
        .catch(error => {
            console.log(`Error caught in ` + functionName + ` - ${error.message}`);
            errorHandler.handleError(req, res, error);
        })
    }
    else {
      let errorMessage = {
        status: "fail",
        message: "User not allowed to delete Host: Token and Admin User don't match"
      }
      res.status(400);
      res.json(errorMessage);
    }
};
