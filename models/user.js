const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mail: { type: String, required: true}, // unique: true
  password: { type: String, required: false},
  username: { type: String, required: true},
  host: [{ type : mongoose.Schema.Types.ObjectId, ref: 'host' }],
  animator: [{ type : mongoose.Schema.Types.ObjectId, ref: 'animator' }],
  birthdate: {type: String, default: "01/01/1900", required: false},
  friends: [ {type: String, unique: true} ]
});



const User = mongoose.model('user', UserSchema);

module.exports = User;
