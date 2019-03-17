const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas and a Model
/*
const PreferenceSchema = new Schema({
    name: String,
    weight: Number
});*/

const artistSchema = new Schema({
  username: { type: String, required: true},
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: {type: String}
});



const Artsist = mongoose.model('artist', artistSchema);

module.exports = Artist;
