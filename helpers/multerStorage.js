var multer=require('multer');
const path = require('path');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Image = require("../models/media/image");

module.exports.getUpload = function(mongoURI){
  let filename;
  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  var newImage=new Image({
    name:filename
  })

    newImage.save().then(newImage => {
      let response = {
        status: "success",
        message: "image saved created",
        info: newImage
      };
      res.json(response);
  }).catch(error => {
      console.log(`Error caught in set_user_photo` +` - ${error.message}`);
  })

  const upload = multer({ storage });
  return upload;
};
