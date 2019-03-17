const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firtname: { type: String, required: true},
  surname: { type: String, required: true},
  email: { type: String, required: true},
  birthday : String,
  friends:[{type: Schema.type.ObjectId, ref: 'Friend'}]
},{timestamps : true});

const user = mongoose.model('User', hostSchema);

module.exports = user;
