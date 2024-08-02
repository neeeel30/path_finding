const express = require('express');
const trafficUpdateController = require('../controllers/trafficUpdateController');
const router = express.Router();

router.post('/', trafficUpdateController.addTrafficUpdate);

module.exports = router;
