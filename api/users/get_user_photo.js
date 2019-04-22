
const User = require("../../models/user/user");
const Img = require("../../models/media/image");
const mongooseInit = require("../../helpers/mongoDB");
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

module.exports.call = function (req,res ) {

  mongooseInit.initMongoDBConnection("Siima").then((conn)=>{
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); //set collection name to lookup into
    let userId ={
      _id: req.params.userId
    };
    User.findOne(userId).then((result)=>{
      Img.findOne({ _id : result.profile_picture }).then((image)=>{
        console.log(result);
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
      });
    });
  });
};
