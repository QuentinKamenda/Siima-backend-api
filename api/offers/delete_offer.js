// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Offer = require("../../models/event/offer");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "delete-offer";

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
          Offer.findOne({_id: offerId}).then(async (result) => {
            console.log(eventId)
            if (result === null) {
              result = {
                status: "fail",
                message: "No offer found with this id"
              };
            }
            else {
              if (result.admins.indexOf(req.payload._id) >= 0){
                let removed = result;
                for (var i = 0; i < result.admins.length; i++){
                    console.log("Removing " + result._id + " from " + result.admins[i]);
                    await User.findOneAndUpdate( {_id: result.admins[i]} , { $pull : {offers: result._id}})
                    await Animator.findOneAndUpdate( {_id: result.animators[i]} , { $pull : {offers: result._id}})
                    await Host.findOneAndUpdate( {_id: result.hosts[i]} , { $pull : {offers: result._id}})
                }
                result.remove();
                result = {
                  status: "success",
                  message: "Offer deleted",
                  removed: removed
                };
              }
              else {
                res.status(200);
                result = {
                  status: "fail",
                  message: "User " + req.payload._id + " not allowed to delete this offer."
                };
              }
            }
            res.json(result);
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
