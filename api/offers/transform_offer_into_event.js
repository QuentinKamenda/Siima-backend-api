// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");
const verifier = require("../../helpers/verify_event");

const Offer = require("../../models/event/offer");
const Event = require("../../models/event/event");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "transform-offer-into-event";

    await firebase.handleUnauthorizedError(req,res);

    paramCheck.checkParameters(req, functionName)

    .then(() => {
        console.log(functionName + " - Parameters checked successfully.");
        let offerId ={
          _id: req.params.offerId
        };
        return offerId;
      })

      .then(offerId => {
        Offer.findOne(offerId).then(result => {
          if (result === null) {
            result = {
              status: "fail",
              message: "No offer found with this id"
            }
            res.json(result)
          }
          else {
            if (result.admins.indexOf(req.payload._id) >= 0){
              let previous = result;
              let updatedResult = result;

              verifier.checkEventCreation(result).then(result => {
                if (result.status == "fail"){
                  res.json(result)
                } else if (result.status == "success"){
                  update = {
                    status: "archived"
                  }
                  Offer.findOneAndUpdate({_id: req.params.offerId}, update).then(offer => {

                    let eventInformation = new Event({
                      name: offer.name,
                      description: offer.description,
                      tags: offer.tags,
                      location: offer.location,
                      date: offer.date,
                      admins: offer.admins,
                      hosts: offer.hosts,
                      animators: offer.animators
                    });

                    eventInformation.save().then(async (eventInformation) => {
                      for (admin in eventInformation.admins){
                        user = await User.findOne({_id: admin})
                        if (admin === null) {
                            console.log("Administrators: No user registered with this id")
                        }
                        else {
                            user.events.push(eventInfo._id);
                            await result.save();
                        }
                      }
                      for (anim in eventInformation.animators){
                        animator = await Animator.findOne({_id: anim})
                        if (result === null) {
                          console.log("Animators: No animator registered with this id")
                        }
                        else {
                            animator.events.push(eventInfo._id);
                            await result.save();
                        }
                      }
                      for (hostIterator in eventInformation.hosts){
                        host = await Animator.findOne({_id: hostIterator})
                        if (host === null) {
                          console.log("Hosts: No host registered with this id")
                        }
                        else {
                            host.events.push(eventInfo._id);
                            await result.save();
                        }
                      }
                    })

                    result.message = "Event created";
                    res.status(200)
                    res.json(result);
                  })
                }
              })

            }
            else {
                result = {
                  status: "fail",
                  message: "User " + req.payload._id+ " not allowed to modify this offer."
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
