const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    blog:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const comment = mongoose.model('Comment',commentSchema);
module.exports.Comment = comment;