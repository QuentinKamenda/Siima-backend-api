const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateEventSchema = new Schema(
  startingDate : Date,
  endingDate : Date
},{timestamps : true});

const dateEvent = mongoose.model('DateEvent', dateEventSchema);

module.exports = dateEvent;
