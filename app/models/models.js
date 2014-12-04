var mongoose = require('mongoose');

// Conectamos las base de datos con mongoose
mongoose.connect('mongodb://localhost/' + 'fifa15');

module.exports = mongoose;