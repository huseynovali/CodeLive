const mongoose = require("mongoose");

const questionSchema =  mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] // Yorumların olduğu "answers" alanı
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
