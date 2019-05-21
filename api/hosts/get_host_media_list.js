// Import Helper methods
const paramCheck = require("../../helpers/param_checker");

const Host = require("../../models/host/host");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

  let functionName = "get-host-media-list";

  await paramCheck.checkParameters(req, functionName);

  var host = await Host.findOne({_id : req.params.hostId});
  if(host!=null){
    res.json(host.media);
  }
  else{
    var error = {
     error : "no host with this id",
     id: req.params.hostId
    }
    res.json(error);
    console.log("no host with this id");
  }
};
