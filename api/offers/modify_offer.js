// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Offer = require("../../models/event/offer");

module.exports.call = async function (req, res) {

    let functionName = "modify-offer";

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
                Offer.findOneAndUpdate( {_id: req.params.offerId} , req.body ).then(
                  result = {
                    status: "success",
                    message: "Offer updated",
                    _id: req.params.offerId,
                    previous_offer: previous,
                    requested_modifications: req.body
                  }
                )
                res.status(200);
                res.json(result)
              }
              else {
                  result = {
                    status: "fail",
                    message: "User " + req.payload._id+ " not allowed to modify this offer."
                  };
                  res.status(200);
                }
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
