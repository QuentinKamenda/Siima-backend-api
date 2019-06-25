
const User = require("../../models/user/user");
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

module.exports.call = async function (req,res ) {

  await firebase.handleUnauthorizedError(req,res);

  if(req.payload._id === req.body.userId){
    let upload = multerStorage.getUpload(URLMongoDB).single('file');
    upload(req,res, (err) => {
      if(req.body.mediaType === 'picture'){
        let functionName = "set-user-profile-picture";
        paramCheck.checkParameters(req, functionName).then(()=>{
          let userId ={_id: req.params.userId};
          //create a new image object to store the name of the file
          let newMedia = new Media({
            name : req.file.filename,
          });
          //save the image
          newMedia.save().then((picture)=>{
            User.findOne({profile_picture: { $exists: true, $ne: null }, _id: req.params.userId }).then((result)=>{
              if(result==null){
                //put the id of the image object into the corresponding user
                User.findOneAndUpdate( {_id: req.params.userId} , { profile_picture: picture._id })
                .then(()=>{
                  let result = {
                    status: "success",
                    message: "User updated profile picture",
                    _id: req.params.userId,
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
                      User.findOneAndUpdate( {_id: req.params.userId} , { profile_picture: picture._id }).then(()=>{
                        let result = {
                          status: "success",
                          message: "User updated profile picture",
                          _id: req.params.userId,
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
    res.status(400);
    res.send({"error" : " the user and token don t match"});
  }

};
