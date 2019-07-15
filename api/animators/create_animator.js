// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");
const Animator = require("../../models/animator/animator");
const User = require("../../models/user/user");

module.exports.call = async function (req, res) {

    let functionName = "create-animator";

    await firebase.handleUnauthorizedError(req,res);
    console.log(req.payload._id);

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let [desc, loc, email] = ['null', 'null','null'];
          if(!(req.body.description == undefined)){ desc = ''+req.body.description+''}
          if(!(req.body.location == undefined)){ loc = ''+req.body.location+''}
          if(!(req.body.mail == undefined)){ email = ''+req.body.mail+''}
          let animatorInformation = new Animator({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.payload._id],
            description: desc,
            mail: email,
            location: loc
          });
          return animatorInformation;
      })
      // Saves animator as Object in DB
      .then(animatorInfo => {
          animatorInfo.save().then(animatorInfo => {
              User.findOne({_id: req.payload._id}).then(result => {
                  if (result === null) {
                      result = {
                        status: "fail",
                        message: "Creator: No user registered with this id"
                      }
                      res.status(400)
                      res.json(result)
                  }
                  else {
                    result.animators.push(animatorInfo._id);
                    result.save();
                    let response = {
                      status: "success",
                      message: "animator created",
                      animatorInformation: animatorInfo
                    };
                    res.status(200)
                    res.json(response)
                  }
              })
          })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
