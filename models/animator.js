const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimatorSchema = new Schema({
  name: { type: String, required: true}, // unique: true
  categories: [{type: String, required: false}],
  tags: [{type: String, required: false}],
  admins: [ {type: String, unique: true} ],
  moderators: [ {type: String, unique: true} ],
  editors: [ {type: String, unique: true} ],
  description: { type: String, required: false},
  mail: { type: String, required: false},
  phone: { type: String, required: false},
  links: [ {type: String } ],
  //media:
  //location:
  startDate: {type: String, default: "01/01/1900", required: false}
});

const Animator = mongoose.model('animator', AnimatorSchema);

module.exports = Animator;
