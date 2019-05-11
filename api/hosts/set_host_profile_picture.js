
const Host = require("../../models/user/host");
const Media = require("../../models/media/media")
const fs = require("fs");
const errorHandler = require("../../helpers/error_handler");
const paramCheck = require("../../helpers/param_checker");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");

module.exports.call = function (req,res ) {


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
          //put the id of the image object into the corresponding user
          Host.findOneAndUpdate( {_id: req.params.userId} , { profile_picture: picture._id })
          .then(()=>{
            let result = {
              status: "success",
              message: "User updated profile picture",
              _id: req.params.userId,
              new_username: req.body.username
            }

            res.json(result);
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
