// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "remove-host-tags";

    await firebase.handleUnauthorizedError(req,res);

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
              if (result.admins.indexOf(req.payload._id) >= 0){
                let previous = result;
                for (var tag in req.body.tags){
                  result.tags.pull(req.body.tags[tag]);
                }
                result.save();
                response = {
                  status: "success",
                  message: "Host updated",
                  _id: req.params.hostId,
                  previous_host: previous,
                  tag_removed: req.body.tags
                }
              }
              else {
                  response = {
                    status: "fail",
                    message: "User " + req.payload._id + " not allowed to remove a tag from this host."
                  };
                  res.status(200);
                }
              res.json(response);
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
