const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  name: { type: String, required: true}, // unique: true  //true
  //categories: [{type: String, required: false}],          // false
  tags: [{type: String, required: false}],
  admins: [ {type: String} ],               // true
  //moderators: [ {type: String, unique: true} ],           //false
  //editors: [ {type: String, unique: true} ],             //false
  description: { type: String, required: false},           //true
  mail: { type: String, required: false},                  //true
  phone: { type: Number, required: false},                 //true
  links: [ {type:Schema.Types.ObjectId, ref:'Link'}],      //true  Site web
  media: [{type:Schema.Types.ObjectId, ref :'Media'}],      //true
  startDate: {type: Date, default: Date.now , required: true },
  address: String,
  event:[{type:Schema.Types.ObjectId, ref : 'Event'}]
},{timestamps : true});


const host = mongoose.model('Host', hostSchema);

module.exports = host;
