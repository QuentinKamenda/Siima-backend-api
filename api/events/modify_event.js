// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Event = require("../../models/event/event");

module.exports.call = function (req, res) {

    let functionName = "modify-event";

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
              let previous = result;
              Event.findOneAndUpdate( {_id: req.params.eventId} , req.body ).then(
                result = {
                  status: "success",
                  message: "Event updated",
                  _id: req.params.eventId,
                  previous_event: previous,
                  requested_modifications: req.body
                }
              )
              res.status(200);
              res.json(result)
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
