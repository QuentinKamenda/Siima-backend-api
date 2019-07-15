// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "get-host";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let hostId ={
            _id: req.params.hostId
          };
          return hostId;
      })
      .then(hostId => {
          Host.findOne({_id: req.params.hostId}).then(rslt => {
            if (rslt === null) {
              result = {
                status: "fail",
                message: "No host found with this id"
              };
              res.status(400);
            }
            else {
              result = {
                status: "success",
                message: "Host retrieved",
                host: rslt
              };
              res.status(200);
            }
            res.json(result)
          })
        })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
