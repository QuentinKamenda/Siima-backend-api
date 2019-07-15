// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "modify-host";

    await firebase.handleUnauthorizedError(req,res);

    if(req.payload._id === req.body.admin){
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
                  Host.findOneAndUpdate( {_id: req.params.hostId} , req.body ).then(
                    result = {
                      status: "success",
                      message: "Host updated",
                      _id: req.params.hostId,
                      previous_host: previous,
                      requested_modifications: req.body
                    }
                  )
                  res.status(400);
                }
                else {
                  result = {
                    status: "fail",
                    message: "User " + req.payload._id+ " not allowed to modify this host."
                  };
                  res.status(200);
                }
                res.json(result)
              }
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
        message: "User not allowed to modify Host: Token and Admin User don't match"
      }
      res.status(400);
      res.json(errorMessage);
    }

};
