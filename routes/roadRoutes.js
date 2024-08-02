const express = require('express');
const roadController = require('../controllers/roadController');
const router = express.Router();

router.post('/', roadController.addRoad);

module.exports = router;
