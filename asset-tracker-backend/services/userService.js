const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getUserInfo = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

exports.updateUser = async (userId, userData) => {
  const user = await User.findById(userId);
  user.name = userData.name || user.name;
  user.email = userData.email || user.email;
  await user.save();
  return user;
};

exports.updateEmail = async (userId, email) => {
  const user = await User.findById(userId);
  user.email = email;
  await user.save();
  return user;
};

exports.updatePassword = async (userId, password) => {
  console.log('userId',userId);
  console.log('password',password);
  const user = await User.findById(userId);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  return user;
};

exports.verifyPassword = async (userId, password) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    console.error('Error verifying password:', err);
    throw err;
  }
};

exports.changeTheme = async (userId, theme) => {
  const user = await User.findById(userId);
  user.theme = theme;
  await user.save();
  return user;
};

exports.deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};
