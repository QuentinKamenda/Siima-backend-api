// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Animator = require("../../models/animator/animator");
const User = require("../../models/user/user");

module.exports.call = function (req, res) {

    let functionName = "delete-animator";

    // TODO: Verify rights

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let animatorId ={
            _id: req.params.animatorId
          };
          return animatorId;
      })
      .then(animatorId => {
          Animator.findOne({_id: animatorId}).then(result => {
            if (result === null) {
              result = {
                status: "fail",
                message: "No animator found with this id"
              };
            }
            else {
              let removed = result;
              for (var i = 0; i < result.admins.length; i++){
                  console.log("Removing " + result._id + " from " + result.admins[i]);
                  User.findOneAndUpdate( {_id: result.admins[i]} , { $pull : {animators: result._id}}).then()
              }
              result.remove();
              result = {
                status: "success",
                message: "Animator deleted",
                removed: removed
              };
            }
            res.json(result);
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
