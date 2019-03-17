const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  username: { type: String, required: true},
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: {type: String},
  event:[{type:Schema.Types.ObjectId, ref : 'Event'}]
},{timestamps : true});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;
