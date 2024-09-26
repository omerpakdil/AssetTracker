const Alarm = require('../models/Alarm');

const getAlarmsByUserId = async (userId) => {
  return await Alarm.find({ userId });
};

const addAlarm = async (userId, assetId, targetPrice) => {
  const alarm = new Alarm({ userId, assetId, targetPrice });
  await alarm.save();
  return alarm;
};

module.exports = { getAlarmsByUserId, addAlarm };
