const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  port     : config.port,
  database : config.database
});

module.exports = connection;
