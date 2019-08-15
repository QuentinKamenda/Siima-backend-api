const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({

  // Internal information
  status: {type: String, default: 'created'},

  // Descriptive information
  name: { type: String, required: true},
  tags: [{type: String, required: false}],
  description: { type: String, required: true},
  location: {type: String, required: true},
  date: {type: String, required: true},
  price: {type: Number, default: 0},
  remainingPlaces: {type: Number, default: -1},

  // Links with other entities
  participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  animators: [{ type : Schema.Types.ObjectId, ref: 'Animator' }],
  hosts:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  admins: [{ type : Schema.Types.ObjectId, ref: 'User' }],

  // Media
  media:{type: Schema.Types.ObjectId , ref : 'Media'},
  profile_picture:{type: Schema.Types.ObjectId, ref: 'Media'},

  // Unimplemented
  links: [ {type:Schema.Types.ObjectId, ref:'Link'}],
  facilities: [{type: String}],
  access: [{type: String}],
  startingDate : String,
  endingDate : String
},{timestamps : true});

const event = mongoose.model('Event', eventSchema);

module.exports = event;
