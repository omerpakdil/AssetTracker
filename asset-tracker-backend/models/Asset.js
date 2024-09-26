const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['Cryptocurrency', 'Stock', 'Fund'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
