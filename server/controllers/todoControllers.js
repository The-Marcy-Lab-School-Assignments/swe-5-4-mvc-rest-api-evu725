const todoModel = require('../models/todoModel.js');

// Get All (Read)
module.exports.listTodos = (req, res) => {
  const todosList = todoModel.list();
  res.send(todosList);
};

// Get One (Read)
module.exports.findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));

  if (!todo) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }
  res.send(todo);
};

// Create
module.exports.createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: "Todo is missing" });
  }

  const newTask = todoModel.create(task);
  res.send(newTask);
};

// Update
module.exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const todo = todoModel.update(Number(id), { isDone });

  if (!todo) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }

  res.send(todo);
};

// Delete
module.exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const didDelete = todoModel.destroy(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No todo with the id ${id}`
    });
  }

  res.sendStatus(204);
};