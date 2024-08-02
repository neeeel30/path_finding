const { log } = require('console');
const pathfindingService = require('../services/pathfindingService');

exports.getShortestPath = async (req, res) => {
  try {
    const { start_location_id, end_location_id } = req.query;
    // console.log(req.query)
    const path = await pathfindingService.calculateShortestPath(start_location_id, end_location_id);
    res.status(200).json(path);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
