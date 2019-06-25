// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");
const expressValidator = require('express-validator');
const firebase = require("../../helpers/firebase");
const User = require("../../models/user/user");
const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

  await firebase.handleUnauthorizedError(req,res);

  var user = await User.findOne({_id : req.payload._id});
  if(user!=null && user["animators"].indexOf(req.params.animatorId)!=-1){
    let functionName = "add-animator-media";

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
        res.status(200);
        res.json({error: "this media type does not exist" });
      }
      var mediaSaved = await media.save();
      await Animator.findOneAndUpdate( {_id: req.params.animatorId},{$push: {media: mediaSaved.id} } );
      let result = {
        status: "success",
        message: "a media was added to this animator",
        _id: req.params.animatorId,
      }
      res.status(200);
      res.json(result);
    });
  }
  else{
    console.log("user is not admin or does not exist");
    res.status(400);
    res.send({"error":"no user with this id or is admin"});
  }
};
