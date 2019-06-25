// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");
const expressValidator = require('express-validator');
const firebase = require("../../helpers/firebase");
const User = require("../../models/user/user");
const Event = require("../../models/event/event");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

  await firebase.handleUnauthorizedError(req,res);

  var eventObject = await Event.findOne({_id : req.params.eventId});
  if(eventObject!=null && eventObject["admins"].indexOf(req.payload._id)!=-1)
  {

    let functionName = "add-event-media";

    await paramCheck.checkParameters(req, functionName);
    var media;

    let upload = multerStorage.getUpload(URLMongoDB).single('file');
    upload(req,res,async function (err){
      if(req.body.mediaType === 'picture'){
        media = new Media({
          typeMedia : req.body.mediaType,
          name : req.file.filename,
        });
        if(req.checkBody('description').exists()){
          media.set('description',req.body.description);
        }
      }
      else if(req.body.mediaType === 'video'){
        media = new Media({
          typeMedia : req.body.mediaType,
          videoLink : req.body.videoLink,
        });
        if(req.checkBody('description').exists()){
          media.set('description',req.body.description);
        }
      }
      else{
        res.json({error: "this media type does not exist" });
      }
      var mediaSaved = await media.save();
      await Event.findOneAndUpdate( {_id: req.params.eventId},{$push: {media: mediaSaved.id} } );
      let result = {
        status: "success",
        message: "a media was added to this event",
        _id: req.params.hostId,
      }
      res.json(result);
    });
  }else{
    res.send({"error": "user is not admin or event does not exist"});
  }

};
