const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  requester:{type:Schema.Types.ObjectId, ref : 'User' },
  recipient:{type:Schema.Types.ObjectId, ref : 'User' },
  status:{
    type: Number , emums: [
      0,//nothing of refused
      1,//requested (was send)
      2,//pending (was been send en recieved)
      3//accepted
    ]
  }
},{timestamps : true});

const friend = mongoose.model('Friend', friendSchema);

module.exports = friend;
