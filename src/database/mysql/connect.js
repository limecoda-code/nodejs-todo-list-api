const config = require('../../config');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: config.db.host,
	port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: 'todo'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;