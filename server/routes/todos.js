const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Todo = require('../models/Todo');

// @route   GET /api/todos
// Kullanıcının tüm todo'larını getir
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/todos
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      user: req.user.id
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   PUT /api/todos/:id  (toggle complete)
router.put('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) return res.status(404).json({ msg: 'Todo bulunamadı' });
    
    // Kullanıcı kendi todo'sunu mu güncelliyor?
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Yetki yok' });
    }
    
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { completed: !todo.completed } },
      { new: true }
    );
    
    res.json(todo);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

// @route   DELETE /api/todos/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) return res.status(404).json({ msg: 'Todo bulunamadı' });
    
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Yetki yok' });
    }
    
    await Todo.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Todo silindi' });
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
