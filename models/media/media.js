const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  typeMedia : String,
  name : { type: String},
  videoLink : String ,
  description : String
},{timestamps : true});

const media = mongoose.model('Media', mediaSchema);

module.exports = media;
