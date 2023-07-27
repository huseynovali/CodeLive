const mongoose = require("mongoose");


const commentSchema = mongoose.Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;