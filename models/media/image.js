var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  photo: String,
  comment: String
},{timestamps : true});

module.exports = mongoose.model('Image', imageSchema);
