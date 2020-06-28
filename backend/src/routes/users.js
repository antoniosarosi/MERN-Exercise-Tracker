const User = require('../models/User');

const router = require('express').Router();

// All users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong...' });
  }
});

// Add user
router.post('/add', async (req, res) => {
  try {
    const username = req.body.username;
    const exists = (await User.find({ username })).length > 0;

    if (exists) {
      return res.status(400).json({
        message: 'username already exists',
        success: false,
      });
    }
    await new User({ username }).save();
    res.json({ message: 'User added', success: true });
  }
  catch (e) {
    console.log(e);
    if (e.name === 'ValidationError') {
      res.status(400).json({
        message: 'username is not set or has length lower than 3',
        success: false,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong...',
        success: false,
      });
    }
  }
});

module.exports = router;
