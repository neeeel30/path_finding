const express = require('express');
const pathfindingController = require('../controllers/pathfindingController');
const router = express.Router();

router.get('/', pathfindingController.getShortestPath);

module.exports = router;
