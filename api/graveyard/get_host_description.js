// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "get-host-description";

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
              };
            }
            return result;
          })
          .then(hostInfo => {
            if (hostInfo.description === undefined) {
              let response = {
                status: "fail",
                message: "No decription registered for this host"
              };
              res.json(response);
            } else {
              let response = {
                description : hostInfo.description
              };
              res.json(response);
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
