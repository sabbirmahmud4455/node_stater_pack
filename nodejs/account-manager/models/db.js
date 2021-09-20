const mysql = require('mysql');
const Bluebird = require('bluebird');

const config = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'MysqlAdmin2021',
  database: 'accountdb'
};

const connection = mysql.createConnection(config);
connection.query = Bluebird.promisify(connection.query);

module.exports = connection;