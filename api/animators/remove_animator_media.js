// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");
const mongoose = require('mongoose');

module.exports.call = async  function (req, res) {

  let functionName = "remove-animator-media";

  await paramCheck.checkParameters(req, functionName);
  var hostWithMedia = await Animator.findOneAndUpdate( { _id: req.params.animatorId }, { $pull: { media: req.body.idMedia } },{ new: true });
  if(hostWithMedia != null){
    var removedMedia = await Media.findOneAndRemove({  _id: req.body.idMedia });
    if(removedMedia != null){
      console.log(removedMedia);
      var conn = await mongooseInit.initMongoDBConnection();
      const gfs = await Grid(conn.db, mongoose.mongo);
      await gfs.collection('uploads');
      gfs.files.remove({filename: removedMedia.name });

      let result = {
        status: "success",
        message: "a media was remove from this animator",
        _id: req.params.hostId,
      }
      res.json(result);
      console.log("a media was remove from this host");
    }
    else{
      console.log("no media with this id were found");
    }
  }
};
