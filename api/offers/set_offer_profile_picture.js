
const Offer = require("../../models/event/offer");
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

  await firebase.handleUnauthorizedError(req,res);

  var offerObject = await Offer.findOne({_id : req.params.offerId});
  if(offerObject!=null && offerObject["admins"].indexOf(req.payload._id)!=-1){
    let upload = multerStorage.getUpload(URLMongoDB).single('file');
    upload(req,res, (err) => {
      if(req.body.mediaType === 'picture'){
        let functionName = "get-offer-profile-picture";
        paramCheck.checkParameters(req, functionName).then(()=>{
          //create a new image object to store the name of the file
          let newMedia = new Media({
            name : req.file.filename,
          });
          //save the image
          newMedia.save().then((picture)=>{
            Offer.findOne({profile_picture: { $exists: true, $ne: null }, _id: req.params.offerId }).then((result)=>{
              if(result==null){
                //put the id of the image object into the corresponding user
                Offer.findOneAndUpdate( {_id: req.params.offerId} , { profile_picture: picture._id })
                .then(()=>{
                  let result = {
                    status: "success",
                    message: "offer updated profile picture",
                    _id: req.params.offerId,
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
                      Offer.findOneAndUpdate( {_id: req.params.offerId} , { profile_picture: picture._id }).then(()=>{
                        let result = {
                          status: "success",
                          message: "Event updated profile picture",
                          _id: req.params.offerId,
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
    res.send({"error":"offer does not exist or user is not admin"});
  }

};
