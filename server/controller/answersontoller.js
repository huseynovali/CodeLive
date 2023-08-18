const Question = require("../model/questionSchema");
const Answer = require("../model/answerSchema");
const moment = require('moment');

const answerController = {
  addAnswer: async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    try {
      const { content } = req.body;

      const question = await Question.findById(questionId);

      if (!question) {
        return res.status(404).json({ message: "question not found!" });
      }
      const newAnswer = new Answer({
        content,
        author: userId,
        createdAt: moment().format()
      });
      await newAnswer.save();
      question.answers.push(newAnswer._id);
      await question.save();

      res.status(201).json({ message: "Answer added successfully!", newAnswer });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while adding the answer.", error: error.message });
    }
  },

  deleteAnswer: async (req, res) => {
    const answerId = req.params.answerId;

    try {
      const answer = await Answer.findByIdAndDelete(answerId);
      if (!answer) {
        return res.status(404).json({ message: "Answer not found!" });
      }
      const question = await Question.findOneAndUpdate(
        { answers: answerId },
        { $pull: { answers: answerId } },
        { new: true }
      );
      res.status(200).json({ message: "Answer deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the answer.", error: error.message });
    }
  },

  editAnswer: async (req, res) => {
    const answerId = req.params.answerId;
    const { content } = req.body;

    try {
      const answer = await Answer.findByIdAndUpdate(answerId, { content }, { new: true });
      if (!answer) {
        return res.status(404).json({ message: "Answer not found!" });
      }

      const question = await Question.findOne({ answers: answerId });
      if (question) {
        const answerIndex = question.answers.findIndex(ans => ans.equals(answerId));
        if (answerIndex !== -1) {
          question.answers[answerIndex] = answerId;
          await question.save();
        }
      }

      res.status(200).json({ message: "Answer updated successfully!", answer });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the answer.", error: error.message });
    }
  },
  // Doğru işaretlemeyi eklemek için
  addCorrectAnswer: async (req, res) => {
    const answerId = req.params.answerId;
    const userId = req.params.userId;
    try {
      const updatedAnswer = await Answer.findByIdAndUpdate(
        answerId,
        { 
          $addToSet: { correct: userId }, // Kullanıcıyı correct dizisine ekle
          $pull: { incorrect: userId }   // Kullanıcıyı incorrect dizisinden çıkar
        },
        { new: true }
      );
      res.status(200).json({ message: "Answer marked as correct.", updatedAnswer });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while marking the answer as correct.", error: error.message });
    }
  },

  addIncorrectAnswer: async (req, res) => {
    const answerId = req.params.answerId;
    const userId = req.params.userId;

    try {
      const updatedAnswer = await Answer.findByIdAndUpdate(
        answerId,
        { 
          $addToSet: { incorrect: userId }, // Kullanıcıyı incorrect dizisine ekle
          $pull: { correct: userId }       // Kullanıcıyı correct dizisinden çıkar
        },
        { new: true }
      );
      res.status(200).json({ message: "Answer marked as incorrect.", updatedAnswer });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while marking the answer as incorrect.", error: error.message });
    }
  },


};

module.exports = answerController;
