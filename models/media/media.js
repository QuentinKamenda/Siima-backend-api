const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  typeMedia: String,
  img: { data: Buffer, contentType: String },
  lienVideo: String
},{timestamps : true});

const media = mongoose.model('Media', mediaSchema);

module.exports = media;
