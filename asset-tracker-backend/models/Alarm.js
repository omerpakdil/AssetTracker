const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  targetPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Alarm = mongoose.model('Alarm', AlarmSchema);
module.exports = Alarm;
