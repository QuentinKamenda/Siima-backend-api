// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Event = require("../../models/event/event");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "modify-event";

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
          Event.findOne(eventId).then(async (result) => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No event found with this id"
              }
              res.json(result)
            }
            else if (result.status != "created") {
              result = {
                status: "fail",
                message: "Error: Impossible to modify a " + result.status + " event.",
                data: result
              }
              res.json(result)
            }
            else {
              if (result.admins.indexOf(req.payload._id) >= 0){
                let previous = result;
                let updatedResult = result;
                if(!(req.body.description == undefined)){ updatedResult.description = ''+req.body.description+''}
                if(!(req.body.tags == undefined)){ updatedResult.tags = req.body.tags}
                if(!(req.body.price == undefined) && (typeof req.body.price) == "number"){ updatedResult.price = req.body.price}
                if(!(req.body.remainingPlaces == undefined) && (typeof req.body.remainingPlaces) == "number"){ updatedResult.remainingPlaces = req.body.remainingPlaces}
                if(!(req.body.location == undefined)){ updatedResult.location = ''+req.body.location+''}
                if(!(req.body.date == undefined)){ updatedResult.date = ''+req.body.date+''}
                if(!(req.body.animator == undefined)){
                  await Animator.findOne({_id: req.body.animator}).then(result => {
                    if (result != null) {updatedResult.animators = [req.body.animator]}
                  })
                  .then(async () => { await Event.findOneAndUpdate( {_id: req.params.eventId} , updatedResult ).then(
                    result = {
                      status: "success",
                      message: "Event updated",
                      _id: req.params.eventId,
                      previous_offer: previous,
                      requested_modifications: req.body
                    }
                  )})
                  .catch(error => {console.log(functionName + ': no animator found with this id')})
                }
                if(!(req.body.host == undefined)){
                  await Host.findOne({_id: req.body.host}).then(result => {
                    if (result != null) {updatedResult.hosts = [req.body.host]}
                  })
                  .then(async () => {await Event.findOneAndUpdate( {_id: req.params.eventId} , updatedResult ).then(
                    result = {
                      status: "success",
                      message: "Event updated",
                      _id: req.params.eventId,
                      previous_offer: previous,
                      requested_modifications: req.body
                    }
                  )})
                  .catch(error => {console.log(functionName + ': no host found with this id')})
                }

                res.status(200);
                res.json(result)
              }
              else {
                res.status(400);
                result = {
                  status: "fail",
                  message: "User " + req.payload._id + " not allowed to modify this event."
                };
              }
              res.json(result)
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
