const assetService = require('../services/assetService');

// Get all assets for a user
const getAssets = async (req, res) => {
  try {
    const userId = req.user.id;
    const assets = await assetService.getAssets(userId);

    if (!assets || assets.length === 0) {
      return res.status(200).json([]); 
    }

    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an asset by its ID
const getAssetById = async (req, res) => {
  try {
    const userId = req.user.id;
    const assetId = req.params.id;
    const asset = await assetService.getAssetById(userId, assetId);

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new asset
const addAsset = async (req, res) => {
  try {
    const userId = req.user.id;
    const assetData = req.body;
    const newAsset = await assetService.addAsset(userId, assetData);
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an asset
const updateAsset = async (req, res) => {
  try {
    const userId = req.user.id;
    const assetId = req.params.id;
    const updatedData = req.body;

    // Check if the asset exists and belongs to the user
    const asset = await assetService.getAssetById(userId, assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // Update the asset
    const updatedAsset = await assetService.updateAsset(userId, assetId, updatedData);
    res.json(updatedAsset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete an asset
const deleteAsset = async (req, res) => {
  try {
    const userId = req.user._id;
    const assetId = req.params.id;
    await assetService.deleteAsset(userId, assetId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAssets,
  addAsset,
  deleteAsset,
  updateAsset,
  getAssetById
};
