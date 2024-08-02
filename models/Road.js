const mongoose = require('mongoose');

const RoadSchema = new mongoose.Schema({
  start_location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  end_location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  traffic_condition: {
    type: String,
    enum: ['clear', 'moderate', 'heavy'],
    default: 'clear'
  }
});

module.exports = mongoose.model('Road', RoadSchema);
