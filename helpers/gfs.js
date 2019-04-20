const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');

module.exports.initConnection = function (conn) {
  // Init stream
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
}
