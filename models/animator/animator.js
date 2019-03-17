const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animatorSchema = new Schema({
  username: { type: String, required: true},
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: {type: String},
  event:[{type:Schema.Types.ObjectId, ref : 'Event'}]
},{timestamps : true});

const animator = mongoose.model('Animator', artistSchema);

module.exports = animtor;
