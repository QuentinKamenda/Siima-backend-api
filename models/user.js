const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and a Model

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name: { type: String, required: true, unique: true},
  host: [{ type : ObjectId, ref: 'host' }],
  animator: [{ type : ObjectId, ref: 'animator' }],
  Preference:[PreferenceSchema],
  activated: { type : Boolean, required : true},
  accessToken: { type: String } ,
  activateToken: { type: String },
  setting:[SettingSchema];
});

const PreferenceSchema = new Schema({
    name: String,
    weight: Number
});

const SettingSchema = new Schema({
    name: String,
    bool: Boolean,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
