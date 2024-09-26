const userService = require('../services/userService');

exports.getUserInfo = async (req, res) => {
  try {
    const user = await userService.getUserInfo(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const user = await userService.updateEmail(req.user.id, req.body.email);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updatePassword = async (req, res) => {
  try {
    console.log('req',req.body);
    const user = await userService.updatePassword(req.user.id, req.body.password);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.checkPassword = async (req, res) => {
  const { currentPassword } = req.body;
  const userId = req.user.id;

  try {
    const isMatch = await userService.verifyPassword(userId, currentPassword);

    console.log('isMatch',isMatch);

    if (isMatch) {
      return res.status(200).json({ message: 'Şifre doğru.' });
    } else {
      return res.status(401).json({ message: 'Mevcut şifre yanlış.' });
    }
  } catch (err) {
    console.error('Error checking password:', err);
    res.status(500).send('Server Error');
  }
};

exports.changeTheme = async (req, res) => {
  try {
    const user = await userService.changeTheme(req.user.id, req.body.theme);
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.user.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
