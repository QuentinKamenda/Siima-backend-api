const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  typeLink: String,
  link: String
},{timestamps : true});

const link = mongoose.model('Link', linkSchema);

module.exports = link;
