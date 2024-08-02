const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const locationRoutes = require('./routes/locationRoutes');
const roadRoutes = require('./routes/roadRoutes');
const trafficUpdateRoutes = require('./routes/trafficUpdateRoutes');
const pathfindingRoutes = require('./routes/pathfindingRoutes');
const reportRoutes = require('./routes/reportRoutes');

const connectDB = require('./utils/db');

const app = express();
app.use(express.json());

connectDB();

app.use('/locations', locationRoutes);
app.use('/roads', roadRoutes);
app.use('/traffic-updates', trafficUpdateRoutes);
app.use('/shortest-path', pathfindingRoutes);
app.use('/report', reportRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
