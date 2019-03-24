const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimatorSchema = new Schema({
  name: { type: String, required: true}, // unique: true  //true
  //categories: [{type: String, required: false}],          // false
  tags: [{type: String, required: false}],                // true
  admins: [ {type: String, unique: true} ],               // true
  //moderators: [ {type: String, unique: true} ],           //false
  //editors: [ {type: String, unique: true} ],              //false
  description: { type: String, required: false},           //true
  mail: { type: String, required: false},                  //true
  phone: { type: Number, required: false},                 //true
  link:{type:Schema.Types.ObjectId, ref : 'Link'},         //true
  media: [{type:Schema.Types.ObjectId, ref :'Media'}],   // true
  startDate: {type: Date, default: Date.now , required: true },
  ville: String,
  event:[{type:Schema.Types.ObjectId, ref : 'Event'}]
},{timestamps : true});

const Animator = mongoose.model('animator', AnimatorSchema);

module.exports = Animator;
