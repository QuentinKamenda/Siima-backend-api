const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and a Model

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: { type: String, required: true, unique: true},
  host: [{ type : ObjectId, ref: 'host' }],
  animator: [{ type : ObjectId, ref: 'animator' }],
  Preference:[PreferenceSchema]
});

const PreferenceSchema = new Schema({
    name: String,
    weight: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
