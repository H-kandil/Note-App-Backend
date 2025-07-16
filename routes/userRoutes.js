import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email exists' });

  const newUser = await User.create({ name, email, password });
  res.status(201).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
