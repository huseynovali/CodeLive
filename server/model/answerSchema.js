const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;