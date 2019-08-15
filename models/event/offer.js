const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({

  // Internal information
  status: {type: String, default: 'created'},

  // Descriptive information
  name: { type: String, required: true},
  tags: [{type: String, required: false}],
  description: { type: String, required: true},
  location: {type: String, required: true},
  date: {type: String, required: true},

  // Links with other entities
  animators: [{ type : Schema.Types.ObjectId, ref: 'Animator' }],
  hosts:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  admins: [{ type : Schema.Types.ObjectId, ref: 'User' }],

  // Media
  media:{type: Schema.Types.ObjectId , ref : 'Media'},
  profile_picture:{type: Schema.Types.ObjectId, ref: 'Media'},

  // Unimplemented
  /*
  participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  price: Number,
  links: [ {type:Schema.Types.ObjectId, ref:'Link'}],
  facilities: [{type: String}],
  remainingPlaces: Number,
  startingDate : String,
  endingDate : String
  */
},{timestamps : true});

const offer = mongoose.model('Offer', offerSchema);

module.exports = offer;
