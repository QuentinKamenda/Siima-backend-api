// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Offer = require("../../models/event/offer");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

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
                let updatedResult = result;
                if(!(req.body.description == undefined)){ updatedResult.description = ''+req.body.description+''}
                if(!(req.body.tags == undefined)){ updatedResult.tags = req.body.tags}
                if(!(req.body.location == undefined)){ updatedResult.location = ''+req.body.location+''}
                if(!(req.body.date == undefined)){ updatedResult.date = ''+req.body.date+''}
                if(!(req.body.animator == undefined)){
                  Animator.findOne({_id: req.body.animator}).then(result => {
                    if (result != null) {updatedResult.animators = [req.body.animator]}
                  })
                  .then(() => {Offer.findOneAndUpdate( {_id: req.params.offerId} , updatedResult ).then(
                    result = {
                      status: "success",
                      message: "Offer updated",
                      _id: req.params.offerId,
                      previous_offer: previous,
                      requested_modifications: req.body
                    }
                  )})
                  .catch(error => {console.log(functionName + ': no animator found with this id')})
                }
                if(!(req.body.host == undefined)){
                  Host.findOne(req.body.host).then(result => {
                    if (result === null) {updatedResult.hosts = ''+req.body.host }
                  })
                  .then(() => {Offer.findOneAndUpdate( {_id: req.params.offerId} , updatedResult ).then(
                    result = {
                      status: "success",
                      message: "Offer updated",
                      _id: req.params.offerId,
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
