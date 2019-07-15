// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Animator = require("../../models/animator/animator");

module.exports.call = async function (req, res) {

    let functionName = "add-animator-tags";

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
                for (var tag in req.body.tags){
                  if (result.tags.indexOf(req.body.tags[tag]) == -1){
                    result.tags.push(req.body.tags[tag]);
                  }
                }
                result.save();
                response = {
                  status: "success",
                  message: "Animator updated",
                  _id: req.params.animatorId,
                  previous_animator: previous,
                  tag_added: req.body.tag
                }
                res.status(200);
              }
              else {
                result = {
                  status: "fail",
                  message: "User " + req.payload._id + " not allowed to modify this animator."
                };
                res.status(400)
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
