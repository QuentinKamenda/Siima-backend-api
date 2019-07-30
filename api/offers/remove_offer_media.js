// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const Event = require("../../models/event/event");
const Offer = require("../../models/event/offer");
const mongoose = require('mongoose');
const firebase = require("../../helpers/firebase");
const User = require("../../models/user/user");

module.exports.call = async  function (req, res) {
  await firebase.handleUnauthorizedError(req,res);

  var offerObject = await Offer.findOne({_id : req.params.offerId});
  if(offerObject!=null && offerObject["admins"].indexOf(req.payload._id)!=-1)
  {
    let functionName = "remove-offer-media";
    await paramCheck.checkParameters(req, functionName);
    var offerWithMedia = await Offer.findOneAndUpdate( { _id: req.params.offerId }, { $pull: { media: req.body.idMedia } },{ new: true });
    if(offerWithMedia != null){
      var removedMedia = await Media.findOneAndRemove({  _id: req.body.idMedia });
      if(removedMedia != null){
        console.log(removedMedia);
        var conn = await mongooseInit.initMongoDBConnection();
        const gfs = await Grid(conn.db, mongoose.mongo);
        await gfs.collection('uploads');
        gfs.files.remove({filename: removedMedia.name });

        let result = {
          status: "success",
          message: "a media was remove from this offer",
          _id: req.params.eventId,
        }
        res.json(result);
        console.log("a media was remove from this offer");
      }
      else{
        console.log("no media with this id were found");
      }
    }
  }else{
    res.send({"error" : "user is not admin or event does not exist"});
  }
};
