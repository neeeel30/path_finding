const Road = require('../models/Road');

exports.addRoad = async (req, res) => {
  try {
    const road = new Road(req.body);
    await road.save();
    res.status(201).json(road);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
