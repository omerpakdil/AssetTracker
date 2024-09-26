const authService = require('../services/authService');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const message = await authService.register({ username, email, password });
    res.send(message);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await authService.login({ email, password });
    res.send(response);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const message = await authService.forgotPassword(email);
    res.send(message);
  } catch (error) {
    console.error('Error sending recovery email:', error);
    res.status(500).send({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const message = await authService.resetPassword(req.params.token, password);
    res.send(message);
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send({ message: error.message });
  }
};
