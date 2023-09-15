const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://hishamhk12:B9Igvw80Fb9BzDeW@nuts.cstohlw.mongodb.net/mydatabase?retryWrites=true&w=majority';

// Establish a connection to the database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Event handlers for connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = mongoose; // Export the mongoose object
