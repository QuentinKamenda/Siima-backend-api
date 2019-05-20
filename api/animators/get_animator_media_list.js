// Import Helper methods
const paramCheck = require("../../helpers/param_checker");

const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

  let functionName = "get-animator-media-list";

  await paramCheck.checkParameters(req, functionName);

  var animator = await Animator.findOne({_id : req.params.animatorId});
  if(animator!=null){
    res.json(animator.media);
  }
  else{
    var error = {
     error : "no animator with this id",
     id: req.params.hostId
    }
    res.json(error);
    console.log("no animator with this id");
  }
};
