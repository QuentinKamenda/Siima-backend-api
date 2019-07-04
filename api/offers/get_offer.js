// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Offer = require("../../models/event/offer");

module.exports.call = async function (req, res) {

    let functionName = "get-offer";

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
          Offer.findOne({_id: req.params.offerId}).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No offer found with this id"
              };
            }
            return result;
          })
          .then(offerId => {
              res.status(200);
              result = {
                status: "success",
                message: "Offer retrieved successfully",
                offerInformation: offerId
              }
              res.json(result)
          })
        })

      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
