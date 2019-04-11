const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');

let gfs;
let storage;
let upload;

module.exports.initConnection = function (conn,nameOfDataBase) {

  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');

  // Create storage engine
  storage = new GridFsStorage({
    url: 'mongodb://localhost/'+nameOfDataBase,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  upload = multer({ storage });
}
