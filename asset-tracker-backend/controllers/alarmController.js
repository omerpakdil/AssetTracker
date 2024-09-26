const alarmService = require('../services/alarmService');

exports.getAlarmsByUserId = async (req, res) => {
  try {
    const alarms = await alarmService.getAlarmsByUserId(req.params.userId);
    res.status(200).json(alarms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addAlarm = async (req, res) => {
  try {
    const alarm = await alarmService.addAlarm(req.body);
    res.status(201).json(alarm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
