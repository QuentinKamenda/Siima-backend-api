const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  birthday :Date,
  friends:[{type: Schema.type.ObjectId, ref: 'Friend'}]
},{timestamps : true});

const user = mongoose.model('User', hostSchema);

module.exports = user;
