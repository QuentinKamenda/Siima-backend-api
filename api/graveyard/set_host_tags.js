// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "set-host-tags";

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
            Host.findOneAndUpdate( {_id: req.params.hostId} , { tags: req.body.tags }).then(
              result = {
                status: "success",
                message: "Host updated: Tags set",
                _id: req.params.hostId,
                previous_host: previous,
                new_tags: req.body.tags
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
