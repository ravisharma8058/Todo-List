const express = require('express');
const TodoModel = require('../models/todoList');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all todos
router.get('/', auth, (req, res) => {
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.status(500).json({ error: 'Failed to fetch todos', details: err }));
});

// Add a new todo
router.post('/', auth, (req, res) => {
    TodoModel.create({
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json({ error: 'Failed to add todo', details: err }));
});

// Update a todo
router.post('/:id', auth, (req, res) => {
    const id = req.params.id;
    const updateData = {
        task: req.body.task,
        status: req.body.status,
        deadline: req.body.deadline,
    };
    TodoModel.findByIdAndUpdate(id, updateData, { new: true })
        .then((todo) => res.json(todo))
        .catch((err) => res.status(500).json({ error: 'Failed to update todo', details: err }));
});

// Delete a todo
router.delete('/:id', auth, (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then((todo) => res.json({ message: 'Todo deleted successfully', todo }))
        .catch((err) => res.status(500).json({ error: 'Failed to delete todo', details: err }));
});

module.exports = router;
