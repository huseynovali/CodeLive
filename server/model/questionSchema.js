const mongoose = require("mongoose");

const questionSchema =  mongoose.Schema({
  test: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }] // Yorumların olduğu "answers" alanı
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
