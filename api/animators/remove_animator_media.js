// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");
const expressValidator = require('express-validator');

const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

  let functionName = "remove-animator-media";

  await paramCheck.checkParameters(req, functionName);
    var a = await Host.findOneAndUpdate( { _id: req.params.animatorId }, { $pull: { media: req.body.idMedia } },{ new: true });
    let result = {
      status: "success",
      message: "a media was remove from this animator",
      _id: req.params.hostId,
    }
    res.json(result);

};
