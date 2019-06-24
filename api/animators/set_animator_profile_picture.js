
const Animator = require("../../models/animator/animator");
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

  var user = await User.findOne({_id : req.payload._id});
  if(user!=null && Array.from(user["animators"]).indexOf(req.params.animatorId)!=1){
    console.log("success");
    let upload = multerStorage.getUpload(URLMongoDB).single('file');
    upload(req,res, (err) => {
      if(req.body.mediaType === 'picture'){
        let functionName = "get-animator-profile-picture";
        paramCheck.checkParameters(req, functionName).then(()=>{
          let animatorId ={_id: req.params.animatorId};
          //create a new image object to store the name of the file
          let newMedia = new Media({
            name : req.file.filename,
          });
          //save the image
          newMedia.save().then((picture)=>{
            Animator.findOne({profile_picture: { $exists: true, $ne: null }, _id: req.params.animatorId }).then((result)=>{
              if(result==null){
                //put the id of the image object into the corresponding user
                Animator.findOneAndUpdate( {_id: req.params.animatorId} , { profile_picture: picture._id })
                .then(()=>{
                  let result = {
                    status: "success",
                    message: "Animator updated profile picture",
                    _id: req.params.animatorId,
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
                      Animator.findOneAndUpdate( {_id: req.params.animatorId} , { profile_picture: picture._id }).then(()=>{
                        let result = {
                          status: "success",
                          message: "Animator updated profile picture",
                          _id: req.params.animatorId,
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
    res.send({"error":"no user with this id or is admin"});
  }
};
