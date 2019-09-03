// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");
const verifier = require("../../helpers/verify_event");

const Offer = require("../../models/event/offer");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "unpublish-offer";

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
              console.log ("Debug: admin OK")
              verifier.checkOfferUnpublishability(result).then(result => {
                console.log ("Debug: check OK" + result.status)
                if (result.status == "fail"){
                  res.json(result)
                } else if (result.status == "success"){
                  update = {
                    status: "created"
                  }
                  Offer.findOneAndUpdate({_id: req.params.offerId}, update).then(() => {
                    result.message = "Offer unpublished";
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
