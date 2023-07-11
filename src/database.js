const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'bd-matricula-implementacion.mysql.database.azure.com',
  port: 3306,
  user: 'administrador',
  password: '@servidor1',
  database: 'colegio',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;

