
const Host = require("../../models/host/host");
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

module.exports.call = async function (req,res ) {

  var user = await User.findOne({_id : req.payload._id});
  if(user!=null && user["hosts"].indexOf(req.params.hostId)!=-1){
    let upload = multerStorage.getUpload(URLMongoDB).single('file');
    upload(req,res, (err) => {
      if(req.body.mediaType === 'picture'){
        let functionName = "set-host-profile-picture";
        paramCheck.checkParameters(req, functionName).then(()=>{
          let hostId ={_id: req.params.hostId};
          //create a new image object to store the name of the file
          let newMedia = new Media({
            name : req.file.filename,
          });
          //save the image
          newMedia.save().then((picture)=>{
            Host.findOne({profile_picture: { $exists: true, $ne: null }, _id: req.params.hostId }).then((result)=>{
              if(result==null){
                //put the id of the image object into the corresponding user
                Host.findOneAndUpdate( {_id: req.params.hostId} , { profile_picture: picture._id })
                .then(()=>{
                  let result = {
                    status: "success",
                    message: "User updated profile picture",
                    _id: req.params.hostId,
                    new_username: req.body.username
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
                      Host.findOneAndUpdate( {_id: req.params.hostId} , { profile_picture: picture._id }).then(()=>{
                        let result = {
                          status: "success",
                          message: "Host updated profile picture",
                          _id: req.params.hostId,
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
  }
  else{
    console.log("user is not admin or does not exist");
    res.send({"error":"user is not authorise or does not exist"});
  }
};
