// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const firebase = require("../../helpers/firebase");

const Offer = require("../../models/event/offer");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Host = require("../../models/host/host");

module.exports.call = async function (req, res) {

    let functionName = "create-offer";

    await firebase.handleUnauthorizedError(req,res);

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let [desc, loc, date] = ['null', 'null', 'null'];
          if(!(req.body.description == undefined)){ desc = ''+req.body.description+''}
          if(!(req.body.location == undefined)){ loc = ''+req.body.location+''}
          if(!(req.body.date == undefined)){ date = ''+req.body.date+''}
          let offerInformation = new Offer({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.payload._id],
            startingDate: date,
            location: loc,
            description: desc,
            date: date
          });
          return offerInformation;
      })
      .then(offerInfo => {
          offerInfo.save().then(async (offerInfo) => {
            let result = await User.findOne({_id: req.payload._id})
            if (result === null) {
                result = {
                  status: "fail",
                  message: "Creator: No user registered with this id"
                }
                res.json(result)
            }
            else {
                result.offers.push(offerInfo._id);
                result.save();
            }
            if(!(req.body.animator == undefined)){
              result = await Animator.findOne({_id: req.body.animator})
              if (result === null) {
                  result = {
                    status: "fail",
                    message: "Animator: No animator registered with this id"
                  }
                  res.json(result)
              }
              else {
                  result.offers.push(offerInfo._id);
                  result.save();
              }
            }

            if(!(req.body.host == undefined)){
              result = await Host.findOne({_id: req.body.host})
              if (result === null) {
                  result = {
                    status: "fail",
                    message: "Host: No host registered with this id"
                  }
                  res.json(result)
              }
              else {
                  result.events.push(offerInfo._id);
                  result.save();
              }
          }
            res.status(200);
            result = {
              status: "success",
              message: "Offer created successfully",
              offerInformation: offerInfo
            }
            res.json(result)

          })
      })
      .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
      })
};
