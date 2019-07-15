// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

const Host = require("../../models/host/host");
const User = require("../../models/user/user");

module.exports.call = async function (req, res) {

    let functionName = "create-host";

    await firebase.handleUnauthorizedError(req,res);

    paramCheck.checkParameters(req, functionName)
      .then(() => {
          console.log(functionName + " - Parameters checked successfully.");
          let [desc, loc, email] = ['null', 'null','null'];
          if(!(req.body.description == undefined)){ desc = ''+req.body.description+''}
          if(!(req.body.location == undefined)){ loc = ''+req.body.location+''}
          if(!(req.body.mail == undefined)){ email = ''+req.body.mail+''}
          let hostInformation = new Host({
            name: req.body.name,
            // Default admin is the Creator
            admins: [req.payload._id],
            description: desc,
            mail: email,
            location: loc
          });
          return hostInformation;
      })
      .then(hostInfo => {
          hostInfo.save().then(hostInfo => {
            User.findOne({_id: req.payload._id}).then(result => {
                if (result === null) {
                    result = {
                      status: "fail",
                      message: "Creator: No user registered with this id"
                    }
                    res.status(400);
                    res.json(result)
                }
                else {
                  result.hosts.push(hostInfo._id);
                  result.save();
                  let response = {
                    status: "success",
                    message: "host created",
                    hostInformation: hostInfo
                  };
                  res.status(200);
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
