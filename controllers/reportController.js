const trafficService = require('../services/trafficService');

exports.generateTrafficReport = async (req, res) => {
  try {
    const report = await trafficService.generateTrafficReport();
    res.status(200).attachment('traffic_report.csv').send(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
