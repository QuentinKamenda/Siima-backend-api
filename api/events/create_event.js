// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Event = require("../../models/event/event");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = function (req, res) {

    let functionName = "create-event";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let eventInformation = new Event({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.body.creator],
            animators: [req.body.animator],
            hosts: [req.body.host],
            lieu: req.body.location
          });
          return eventInformation;
      })
      .then(eventInfo => {
          eventInfo.save().then(async (eventInfo) => {
            let result = await User.findOne({_id: req.body.creator})
            if (result === null) {
                result = {
                  status: "fail",
                  message: "Creator: No user registered with this id"
                }
                res.json(result)
            }
            else {
                result.events.push(eventInfo._id);
                result.save();
            }

            result = await Animator.findOne({_id: req.body.animator})
            if (result === null) {
                result = {
                  status: "fail",
                  message: "Animator: No animator registered with this id"
                }
                res.json(result)
            }
            else {
                result.events.push(eventInfo._id);
                result.save();
            }

            result = await Host.findOne({_id: req.body.host})
            if (result === null) {
                result = {
                  status: "fail",
                  message: "Host: No host registered with this id"
                }
                res.json(result)
            }
            else {
                result.events.push(eventInfo._id);
                result.save();
            }

            res.status(200);
            res.json(eventInfo)

          })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
