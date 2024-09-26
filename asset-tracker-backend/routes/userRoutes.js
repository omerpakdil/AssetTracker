const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authenticate');

router.get('/me', authenticate, userController.getUserInfo);
router.put('/update', authenticate, userController.updateUser);
router.put('/update-email', authenticate, userController.updateEmail);
router.put('/update-password', authenticate, userController.updatePassword);
router.post('/check-password', authenticate, userController.checkPassword);
router.put('/change-theme', authenticate, userController.changeTheme);
router.delete('/delete', authenticate, userController.deleteUser);

module.exports = router;
