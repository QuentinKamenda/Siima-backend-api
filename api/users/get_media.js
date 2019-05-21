// Import Helper methods
const paramCheck = require("../../helpers/param_checker");
const errorHandler = require("../../helpers/error_handler");
const URLMongoDB = 'mongodb://localhost/siima_db';
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const User = require("../../models/user/user");
const Media = require("../../models/media/media");
const mongoose = require('mongoose');

module.exports.call = async  function (req, res) {

  var media = await Media.findOne({ _id : req.params.mediaId });
  if(media!=null){
    if(media.typeMedia=="picture"){
      var conn = await mongooseInit.initMongoDBConnection();
      const gfs = await Grid(conn.db, mongoose.mongo);
      //set collection name to lookup into
      await gfs.collection('uploads');
      gfs.files.find({filename: media.name }).toArray(function(err, files){
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
        res.set('Content-Type', files[0].contentType);
        return readstream.pipe(res);
      });
    }
    else if(media.typeMedia=="video"){
      res.json({
        videoLink : media.videoLink,
        description : media.description
      });
    }
  }
  else{
    console.log("no media with this id");
    res.json({error:"ne media with this id"});
  }
};
