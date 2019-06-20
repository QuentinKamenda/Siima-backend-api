const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true},
  tags: [{type: String, required: false}],
  participants: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  animators: [{ type : Schema.Types.ObjectId, ref: 'Animator' }],
  hosts:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  admins: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String},
  media:{type: Schema.Types.ObjectId , ref : 'Media'},
  price: Number,
  links: [ {type:Schema.Types.ObjectId, ref:'Link'}],
  facilities: [{type: String}],
  remainingPlaces: Number,
  lieu: {type : String , required: true},
  profile_picture:{type: Schema.Types.ObjectId, ref: 'Media'},
  startingDate : String,
  endingDate : String
},{timestamps : true});

const event = mongoose.model('Event', eventSchema);

module.exports = event;
