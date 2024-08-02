const Location = require('../models/Location');

exports.addLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
