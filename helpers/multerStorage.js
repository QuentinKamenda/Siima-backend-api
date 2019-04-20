const multer =require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Image = require("../models/media/image");

module.exports.getUpload = function(mongoURI){
  const storage = multer.diskStorage({
      destination: function (req, res, cb) {
          cb(null, 'uploads/')
      }
  });
  return upload = multer({ storage: storage });
};
