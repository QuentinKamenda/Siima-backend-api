const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and a Model
/*
const PreferenceSchema = new Schema({
    name: String,
    weight: Number
});*/

const hostSchema = new Schema({
  username: { type: String, required: true},
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: {type: String}
});



const Host = mongoose.model('host', hostSchema);

module.exports = Host;
