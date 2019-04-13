// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Animator = require("../../models/animator/animator");

module.exports.call = function (req, res) {

    let functionName = "create-animator";

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let animatorInformation = new Animator({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.body.creator],
            // Default Moderator is the Creator
            //moderators: [req.body.creator],
            // Default Editor id the Creator
            //editors: [req.body.creator],
          });
          return animatorInformation;
      })
      .then(animatorInfo => {
          animatorInfo.save().then(animatorInfo => {
              let response = {
                status: "success",
                message: "animator created",
                animatorInformation: animatorInfo
              };
              res.json(response);
          })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
