// db.js
const mongoose = require('mongoose');

const uri = "mongodb+srv://mongocandidate:FurDlmUu0cCNqiW4@cluster0.aimfplr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToDatabase;
