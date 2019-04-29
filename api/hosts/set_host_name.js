// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "set-host-name";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let hostId ={
            _id: req.params.hostId
          };
          return hostId;
      })
      .then(hostId => {
          Host.findOne(hostId).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No host found with this id"
              }
              res.json(result)
            }
            else {
              let previous = result;
              Host.findOneAndUpdate( {_id: req.params.hostId} , { name: req.body.name }).then(
                result = {
                  status: "success",
                  message: "Host updated",
                  _id: req.params.hostId,
                  previous_animator: previous,
                  new_name: req.body.name
                }
              )
              res.json(result)
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
