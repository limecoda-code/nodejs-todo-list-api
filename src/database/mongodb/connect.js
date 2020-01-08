const config = require('../../config');
const mongoose = require('mongoose');

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', (err) => {
	console.error(err);
	process.exit(1);
});

db.once('open', () => {
	console.log('Connected to ' + config.db.type + ' database');
});

module.exports = db;