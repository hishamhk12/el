const mongoose = require('mongoose');

// Define a schema for a single branch
const branchSchema = new mongoose.Schema({
  id: Number,
  branchName: String,
  openTime: Number,
  closeTime: Number,
  branchNumber: String,
  branchLocation: String,
});



// Create a model for the branches collection
const Branches = mongoose.model('Branches', branchSchema);

module.exports = Branches;
