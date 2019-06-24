
const Event = require("../../models/event/event");
const Media = require("../../models/media/media")
const fs = require("fs");
const errorHandler = require("../../helpers/error_handler");
const paramCheck = require("../../helpers/param_checker");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const firebase = require("../../helpers/firebase");
const User = require("../../models/user/user");

module.exports.call = function (req,res ) {


  let upload = multerStorage.getUpload(URLMongoDB).single('file');
  upload(req,res, (err) => {
    if(req.body.mediaType === 'picture'){
      let functionName = "get-event-profile-picture";
      paramCheck.checkParameters(req, functionName).then(()=>{
        //create a new image object to store the name of the file
        let newMedia = new Media({
          name : req.file.filename,
        });
        //save the image
        newMedia.save().then((picture)=>{
          Event.findOne({profile_picture: { $exists: true, $ne: null }, _id: req.params.eventId }).then((result)=>{
            if(result==null){
              //put the id of the image object into the corresponding user
              Event.findOneAndUpdate( {_id: req.params.eventId} , { profile_picture: picture._id })
              .then(()=>{
                let result = {
                  status: "success",
                  message: "Event updated profile picture",
                  _id: req.params.eventId,
                }
                res.json(result);
              });
            }
            else{
              Media.findOne({_id: result.profile_picture}).then((media)=>{
                mongooseInit.initMongoDBConnection().then((conn)=>{
                  const gfs = Grid(conn.db, mongoose.mongo);
                  //set collection name to lookup into
                  gfs.collection('uploads');
                  gfs.files.remove({filename: media.name });
                  Media.remove({_id: result.profile_picture}).then(()=>{
                    Event.findOneAndUpdate( {_id: req.params.eventId} , { profile_picture: picture._id }).then(()=>{
                      let result = {
                        status: "success",
                        message: "Event updated profile picture",
                        _id: req.params.eventId,
                        new_username: req.body.username
                      }
                      res.json(result);
                    });
                  });
                });
              });
            }
          });
        })
        .catch(error => {
          console.log(`Error caught in ` + functionName + ` - ${error.message}`);
          errorHandler.handleError(req, res, error);
        });
      });
    }
    else{
      console.log("error: media is not a picture");
      res.send({'error' : 'media sent was not a picture'});
    }
  });
};
