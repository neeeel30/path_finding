const Road = require('../models/Road');
const Location = require('../models/Location');
const pathfindingAlgorithm = require('../utils/pathfindingAlgorithm');

exports.calculateShortestPath = async (startLocationId, endLocationId) => {
  try {
    const locations = await Location.find();
    const roads = await Road.find();

    const graph = buildGraph(locations, roads);
    
    const result = pathfindingAlgorithm.findShortestPath(graph, startLocationId, endLocationId);
    // console.log(result);
    
    
    if (result.error) {
      throw new Error(result.error);
    }

    const estimatedTime = calculateEstimatedTime(result.distance);

    return {
      path: result.path,
      total_distance: result.distance,
      estimated_time: estimatedTime
    };
  } catch (err) {
    throw new Error(`Error calculating shortest path: ${err.message}`);
  }
};

const buildGraph = (locations, roads) => {
  const graph = {};

  locations.forEach(location => {
    graph[location._id] = {};
  });

  roads.forEach(road => {
    const weight = getTrafficWeight(road.traffic_condition);
    graph[road.start_location_id][road.end_location_id] = road.distance * weight;
    graph[road.end_location_id][road.start_location_id] = road.distance * weight;
  });

  return graph;
};

const getTrafficWeight = (condition) => {
  switch (condition) {
    case 'clear':
      return 1;
    case 'moderate':
      return 5;
    case 'heavy':
      return 10;
    default:
      return 1;
  }
};

const calculateEstimatedTime = (distance) => {
  const speed = 40; // Assuming an average speed of 40 km/h
  return (distance / speed) * 60; // Estimated time in minutes
};
