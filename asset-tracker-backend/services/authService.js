// services/authService.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const register = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Username already exists');
    } else if (existingUser.email === email) {
      throw new Error('Email already exists');
    }
  }

  const user = new User({ username, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  return 'User registered successfully';
};

const login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  const payload = { user: { id: user.id } };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email not found');
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `Please click on the following link, or paste it into your browser to complete the process:\n\n
    http://192.168.1.106:3000/auth/reset-password/${token}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  await transporter.sendMail(mailOptions);
  return 'Recovery email sent';
};

const resetPassword = async (token, password) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Password reset token is invalid or has expired');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return 'Password has been reset';
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
