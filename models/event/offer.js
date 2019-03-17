const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  name: { type: String, required: true},
  tags: [{type: String, required: false}],
  animator: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Animator' }],
  nbAnimator: Number,
  host:[{type : Schema.Types.ObjectId, ref: 'Host'}],
  nbHost: Number,
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String},
  media:[{type: Schema.Types.ObjectId , ref : 'Media'}],
  date: {type: Schema.Types.ObjectId, ref : 'eventDate' },
  paid: Boolean,
  equipements: [type: String],
  lieu: {type : String , required: true}
  visibility:Number
},{timestamps : true});

const offer = mongoose.model('Offer', offerSchema);

module.exports = offer;
