// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Animator = require("../../models/animator/animator");

module.exports.call = async function (req, res) {

    let functionName = "modify-animator";

    await firebase.handleUnauthorizedError(req,res);

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let animatorId ={
            _id: req.params.animatorId
          };
          return animatorId;
      })
      .then(animatorId => {
          Animator.findOne(animatorId).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No animator found with this id"
              }
              res.status(400)
              res.json(result)
            }
            else {
              if (result.admins.indexOf(req.payload._id) >= 0){
                let previous = result;
                Animator.findOneAndUpdate( {_id: req.params.animatorId} , req.body ).then(
                  result = {
                    status: "success",
                    message: "Animator updated",
                    _id: req.params.animatorId,
                    previous_animator: previous,
                    requested_modifications: req.body
                  }
                )
                res.status(200)
              }
              else {
                result = {
                  status: "fail",
                  message: "User " + req.payload._id + " not allowed to modify this animator."
                };
                res.status(400)
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
