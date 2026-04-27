const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Kullanıcı var mı kontrol et
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Bu email zaten kayıtlı' });
    }
    
    user = new User({ username, email, password });
    
    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // JWT oluştur
    const payload = {
      user: { id: user.id }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Geçersiz bilgiler' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Geçersiz bilgiler' });
    }
    
    const payload = {
      user: { id: user.id }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
