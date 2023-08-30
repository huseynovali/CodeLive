const Todo = require("../model/todoSchema");
const User = require("../model/userSchema");
const moment = require("moment");

const todoController = {
  addTodo: async (req, res) => {
    const userid = req.params.userid;
    const { title, description } = req.body;
    try {
      let user = await User.findById(userid);
      console.log(user);

      const newTodo = new Todo({
        title,
        description,
        createdAt: moment().format(),
      });

      await newTodo.save();
      
      // User'a görevi ekle
      user.todo.push(newTodo);

      // User nesnesini kaydet
      await user.save();

      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = todoController;
