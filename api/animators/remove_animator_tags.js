// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Animator = require("../../models/animator/animator");

module.exports.call = function (req, res) {

    let functionName = "remove-animator-tags";

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
              res.json(result)
            }
            else {
              let previous = result;
              for (var tag in req.body.tags){
                result.tags.pull(req.body.tags[tag]);
              }
              result.save();
              response = {
                status: "success",
                message: "Animator updated",
                _id: req.params.animatorId,
                previous_animator: previous,
                tag_removed: req.body.tags
              }
              res.json(response);
            }
          })
        })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
