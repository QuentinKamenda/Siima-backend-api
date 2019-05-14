
const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");

module.exports.call = function (req,res ) {

  let functionName = "set-animator-profile-picture";

  //connection to mongoDB to get gfs
  mongooseInit.initMongoDBConnection().then((conn)=>{
    const gfs = Grid(conn.db, mongoose.mongo);
    //set collection name to lookup into
    gfs.collection('uploads');
    let animatorId ={
      _id: req.params.animatorId
    };
    //find the user wich you want to get the profile picture from
    Animator.findOne(animatorId).then((result)=>{
      //find the image object wich containe the name of the file
      Media.findOne({ _id : result.profile_picture }).then((image)=>{
        //get the file with the correct name
        gfs.files.find({filename: image.name }).toArray(function(err, files){
            if(!files || files.length === 0){
                return res.status(404).json({
                    responseCode: 1,
                    responseMessage: "error"
                });
            }
            // create read stream
            var readstream = gfs.createReadStream({
                filename: files[0].filename,
                root: "uploads"
            });
            // set the proper content type
            res.set('Content-Type', files[0].contentType)
            // Return response
            return readstream.pipe(res);
        });
      })
    }).catch(error => {
      console.log(`Error caught in ` + functionName + ` - ${error.message}`);
      errorHandler.handleError(req, res, error);
    });
  });
};
