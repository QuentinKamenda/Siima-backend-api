var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }

});

var Image = module.exports = mongoose.model('Image', imageSchema);
