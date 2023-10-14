const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
