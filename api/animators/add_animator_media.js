// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const multerStorage = require("../../helpers/multerStorage");
const expressValidator = require('express-validator');

const Animator = require("../../models/animator/animator");
const Media = require("../../models/media/media");

module.exports.call = async  function (req, res) {

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
        videoLink : req.file.videoLink,
      });
      if(req.checkBody('description').exists()){
        media.set('description',req.body.description);
      }
    }
    var mediaSaved = await media.save();
    await Animator.findOneAndUpdate( {_id: req.params.animatorId},{$push: {media: mediaSaved.id} } );
    let result = {
      status: "success",
      message: "a media was added to this animator",
      _id: req.params.animatorId,
    }
    res.json(result);
  });
};
