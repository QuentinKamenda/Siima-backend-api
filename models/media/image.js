var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  name: { type: String, required: true},
  id: {type: Schema.Types.ObjectId, ref: 'uploads'},
  comment: String
},{timestamps : true});

module.exports = mongoose.model('Image', imageSchema);
