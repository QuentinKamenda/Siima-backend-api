// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");
const User = require("../../models/user/user");

module.exports.call = function (req, res) {

    let functionName = "delete-host";

    // TODO: Verify rights

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
            }
            else {
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
            }
            res.json(result);
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
