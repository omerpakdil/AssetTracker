const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
const { authenticate } = require('../middleware/authenticate');

// Get user's assets
router.get('/', authenticate, assetController.getAssets);

// Get an asset by its ID
router.get('/:id', authenticate, assetController.getAssetById); // Yeni route eklendi

// Add a new asset
router.post('/', authenticate, assetController.addAsset);

// Update an asset
router.put('/:id', authenticate, assetController.updateAsset);

// Delete an asset
router.delete('/:id', authenticate, assetController.deleteAsset);


module.exports = router;
