// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Event = require("../../models/event/event");

module.exports.call = function (req, res) {

    let functionName = "get-event";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let eventId ={
            _id: req.params.eventId
          };
          return eventId;
      })
      .then(eventId => {
          Event.findOne({_id: req.params.eventId}).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No event found with this id"
              };
            }
            return result;
          })
          .then(eventId => {
              res.status(200);
              result = {
                status: "success",
                message: "Event retrieved successfully",
                eventInformation: eventId
              }
              res.json(result)
          })
        })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
