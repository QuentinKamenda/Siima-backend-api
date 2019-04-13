// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "create-host";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let hostInformation = new Host({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.body.creator],
            // Default Moderator is the Creator
            //moderators: [req.body.creator],
            // Default Editor id the Creator
            //editors: [req.body.creator],
          });
          return hostInformation;
      })
      .then(hostInfo => {
          hostInfo.save().then(hostInfo => {
              let response = {
                status: "success",
                message: "animator created",
                hostInformation: hostInfo
              };
              res.json(response);
          })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
