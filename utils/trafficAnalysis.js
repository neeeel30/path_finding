const Road = require('../models/Road');
const TrafficUpdate = require('../models/TrafficUpdate');
const { Parser } = require('json2csv');

exports.generateTrafficReport = async () => {
  try {
    const roads = await Road.find().populate('start_location_id end_location_id');
    const trafficUpdates = await TrafficUpdate.find().sort({ timestamp: -1 });

    const data = roads.map(road => {
      const recentUpdate = trafficUpdates.find(update => update.road_id.equals(road._id));
      return {
        start_location: road.start_location_id.name,
        end_location: road.end_location_id.name,
        distance: road.distance,
        traffic_condition: recentUpdate ? recentUpdate.traffic_condition : road.traffic_condition,
        last_updated: recentUpdate ? recentUpdate.timestamp : 'N/A'
      };
    });

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    return csv;
  } catch (err) {
    throw new Error('Error generating traffic report: ' + err.message);
  }
};
