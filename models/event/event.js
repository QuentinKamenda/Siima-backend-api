const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  name: { type: String, required: true},
  tags: [{type: String, required: false}],
  participant: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  animator: [{ type : Schema.Types.ObjectId, ref: 'Animator' }],
  host:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  admin: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String},
  media:{type: Schema.Types.ObjectId , ref : 'Media'},
  date: evenDate,
  price: Number,
  links: [ {type:Schema.Types.ObjectId, ref:'Link'}],
  facilities: [type: String],
  remainingPlaces: Number,
  lieu: {type : String , required: true}

},{timestamps : true});

const event = mongoose.model('Event', eventSchema);

module.exports = event;
