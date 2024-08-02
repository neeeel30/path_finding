const TrafficUpdate = require('../models/TrafficUpdate');

exports.addTrafficUpdate = async (req, res) => {
  try {
    const trafficUpdate = new TrafficUpdate(req.body);
    await trafficUpdate.save();
    res.status(201).json(trafficUpdate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
