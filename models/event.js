const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema(
  name: { type: String, required: true},
  participant: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  animator: [{ type : mongoose.Schema.Types.ObjectId, ref: 'animator' }],
  admin: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String},
  date: {type: Date, default: Date.now , required: true },
  lieu: {type : String , required: true}
});



const Event = mongoose.model('event', UserSchema);

module.exports = User;
