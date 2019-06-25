// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const Event = require("../../models/event/event");
const Media = require("../../models/media/media");
const mongoose = require('mongoose');
const firebase = require("../../helpers/firebase");
const User = require("../../models/user/user");

module.exports.call = async  function (req, res) {
  await firebase.handleUnauthorizedError(req,res);

  var eventObject = await Event.findOne({_id : req.params.eventId});
  if(eventObject!=null && eventObject["admins"].indexOf(req.payload._id)!=-1)
  {
    let functionName = "remove-event-media";
    await paramCheck.checkParameters(req, functionName);
    var eventWithMedia = await Event.findOneAndUpdate( { _id: req.params.eventId }, { $pull: { media: req.body.idMedia } },{ new: true });
    if(eventWithMedia != null){
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
          _id: req.params.eventId,
        }
        res.json(result);
        console.log("a media was remove from this host");
      }
      else{
        console.log("no media with this id were found");
      }
    }
  }else{
    res.send({"error" : "user is not admin or event does not exist"});
  }
};
