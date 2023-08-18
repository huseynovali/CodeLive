const User = require("../model/userSchema");
const Question = require("../model/questionSchema");

const questionController = {

  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find()
        .populate("author", "username")
        .populate({
          path: "answers",
          populate: {
            path: "author",
            select: "username",
          },
        });

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching questions.", error: error.message });
    }
  },
  
  getQuestionsByVideoId: async (req, res) => {
    const questionId = req.params.questionId;
    try {
      const questions = await Question.findById(questionId)
        .populate("author", "username")

        .populate({
          path: "answers",
          populate: {
            path: "author",
            select: "username",
          },
        })
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching questions.", error: error.message });
    }
  },

  addQuestion: async (req, res) => {
    const author = req.params.userId
    const { text } = req.body;
    try {

      const newQuestion = new Question({ text, author });
      await newQuestion.save();


      const user = await User.findById(author);
      if (user) {
        user.questions.push(newQuestion._id);
        await user.save();
      }

      res.status(201).json({ message: "Question added successfully!", newQuestion });
    } catch (error) {
      res.status(400).json({ message: "An error occurred while adding the question.", error: error.message });
    }
  },

  deleteQuestion: async (req, res) => {
    const questionId = req.params.questionId;
    try {
      const question = await Question.findByIdAndDelete(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found!" });
      }

      const user = await User.findById(question.author);
      if (user) {
        user.questions = user.questions.filter((id) => id.toString() !== questionId);
        await user.save();
      }

      res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the question.", error: error.message });
    }
  },

  editQuestion: async (req, res) => {
    const questionId = req.params.questionId;
    const { text } = req.body;
    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found!" });
      }

      question.text = text || question.text;
      await question.save();

  

      res.status(200).json({ message: "Question updated successfully!", question });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the question.", error: error.message });
    }
  },
};

module.exports = questionController;
