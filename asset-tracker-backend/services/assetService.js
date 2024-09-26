  const Asset = require('../models/asset');

  // Get all assets for a user
  const getAssets = async (userId) => {
    try {
      return await Asset.find({ userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Add a new asset
  const addAsset = async (userId, assetData) => {
    try {
      const asset = new Asset({ ...assetData, userId });
      return await asset.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Get an asset by its ID
const getAssetById = async (userId, assetId) => {
  try {
    return await Asset.findOne({ _id: assetId, userId });
  } catch (error) {
    throw new Error(error.message);
  }
};
  

  // Update an asset
  const updateAsset = async (userId, assetId, updatedData) => {
    try {
      const asset = await Asset.findOneAndUpdate(
        { _id: assetId, userId },
        updatedData,
        { new: true } // Return the updated document
      );
      if (!asset) {
        throw new Error('Asset not found or not owned by user');
      }
      return asset;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  // Delete an asset
  const deleteAsset = async (userId, assetId) => {
    try {
      return await Asset.deleteOne({ _id: assetId, userId });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  module.exports = {
    getAssets,
    addAsset,
    deleteAsset,
    getAssetById,
    updateAsset
  };
