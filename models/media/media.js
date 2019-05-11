const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  typeMedia: String,
  name: { type: String, required: true},
  lienVideo: String
},{timestamps : true});

const media = mongoose.model('Media', mediaSchema);

module.exports = media;
