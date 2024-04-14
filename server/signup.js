// signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user');

router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      confirmPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
