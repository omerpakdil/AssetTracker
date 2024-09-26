  // server.js
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const connectToDatabase = require('./db');
  const authRoutes = require('./routes/authRoutes');
  const userRoutes = require('./routes/userRoutes');
  const assetRoutes = require('./routes/assetRoutes');
  const alarmRoutes = require('./routes/alarmRoutes');

  const app = express();
  app.use(cors());
  app.use(express.json());

  // MongoDB bağlantısını başlat
  connectToDatabase();

  // Init Middleware
  app.use(express.json({ extended: false }));

  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.use('/assets', assetRoutes);
  app.use('/alarms', alarmRoutes);

  // Server'ı başlat
  app.listen(3000, '192.168.1.104', () => {
    console.log('Server is running on localhost:3000');
  });
