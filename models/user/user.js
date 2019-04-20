const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true},
  mail: { type: String, required: true},
  birthday :Date,
  friends:[{type: Schema.Types.ObjectId, ref: 'Friend'}],
  hosts:[{type: Schema.Types.ObjectId, ref: 'Host'}],
  animators:[{type: Schema.Types.ObjectId, ref: 'Animator'}],
  profile_picture:{type: Schema.Types.ObjectId, ref: 'Image'}
},{timestamps : true});

const user = mongoose.model('User', userSchema);

module.exports = user;
