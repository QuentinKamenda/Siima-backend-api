const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const Tag = new Schema({
    title: String,
    weight: Number
});

const UserSchema = new Schema({
    name: String,
    age:Number,
    tag: [Tag]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
