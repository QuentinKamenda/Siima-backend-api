// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Animator = require("../../models/animator/animator");

module.exports.call = function (req, res) {

    let functionName = "get-animator-name";

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
              };
            }
            return result;
          })
          .then(animatorInfo => {
            if (animatorInfo.name === undefined) {
              let response = {
                status: "fail",
                message: "No name registered for this animator"
              };
              res.json(response);
            } else {
              let response = {
                name : animatorInfo.name
              };
              res.json(response);
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
