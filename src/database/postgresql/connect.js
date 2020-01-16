const config = require('../../config');
const pg = require('pg')

const client = new pg.Client({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
});

client.connect();

module.exports = client;