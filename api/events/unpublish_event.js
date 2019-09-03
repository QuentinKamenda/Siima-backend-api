// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");
const verifier = require("../../helpers/verify_event");

const Event = require("../../models/event/event");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "unpublish-event";

    await firebase.handleUnauthorizedError(req,res);

    paramCheck.checkParameters(req, functionName)

    .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        let eventId ={
          _id: req.params.eventId
        };
        return eventId;
      })

      .then(eventId => {
        Event.findOne(eventId).then(result => {
          if (result === null) {
            result = {
              status: "fail",
              message: "No event found with this id"
            }
            res.json(result)
          }
          else {
            if (result.admins.indexOf(req.payload._id) >= 0){
              let previous = result;
              let updatedResult = result;
              console.log ("Debug: admin OK")
              verifier.checkEventUnpublishability(result).then(result => {
                console.log ("Debug: check OK" + result)
                if (result.status == "fail"){
                  res.json(result)
                } else if (result.status == "success"){
                  update = {
                    status: "created"
                  }
                  Event.findOneAndUpdate({_id: req.params.eventId}, update).then(() => {
                    result.message = "Event unpublished";
                    res.json(result);
                  })

                }
              })

            }
            else {
                result = {
                  status: "fail",
                  message: "User " + req.payload._id+ " not allowed to modify this event."
                }
                res.status(200);
                res.json(result)
              }
          }
        })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
