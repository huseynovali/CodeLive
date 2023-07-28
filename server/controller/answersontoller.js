const User = require("../model/userSchema");
const Question = require("../model/questionSchema");
const Answer = require("../model/answerSchema");

const answerController = {
  addAnswer: async (req, res) => {
    try {
      const { content, authorId, questionId } = req.body;
      const user = await User.findById(authorId);
      const question = await Question.findById(questionId);

      if (!user || !question) {
        return res.status(404).json({ message: "User or question not found!" });
      }

      const newAnswer = new Answer({
        content,
        author: authorId,
      });

      await newAnswer.save();

      user.answers.push(newAnswer._id);
      await user.save();

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

      const user = await User.findById(answer.author);
      const question = await Question.findOneAndUpdate(
        { answers: answerId },
        { $pull: { answers: answerId } },
        { new: true }
      );

      if (user) {
        user.answers = user.answers.filter((id) => id.toString() !== answerId);
        await user.save();
      }

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

      const user = await User.findById(answer.author);
      const question = await Question.findOneAndUpdate(
        { answers: answerId },
        { "answers.$": answerId },
        { new: true }
      );

      if (user) {
        user.answers = user.answers.map((id) => (id.toString() === answerId ? answerId : id));
        await user.save();
      }

      res.status(200).json({ message: "Answer updated successfully!", answer });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the answer.", error: error.message });
    }
  },
};

module.exports = answerController;
