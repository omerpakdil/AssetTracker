const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarmController');

router.get('/:userId', alarmController.getAlarmsByUserId);
router.post('/', alarmController.addAlarm);

module.exports = router;
