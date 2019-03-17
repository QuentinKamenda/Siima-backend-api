const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  name: { type: String, required: true},
  participant: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  animator: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Animator' }],
  host:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String},
  date: {type: Date, default: Date.now , required: true },
  lieu: {type : String , required: true}
},{timestamps : true});

const Event = mongoose.model('Event', UserSchema);

module.exports = User;
