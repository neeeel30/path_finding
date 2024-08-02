const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();

router.get('/traffic', reportController.generateTrafficReport);

module.exports = router;
