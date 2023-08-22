const mysql = require('mysql');


const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'AXE',
  multipleStatements: true
});
/*const mysqlConnection = mysql.createConnection({
  host: '142.44.161.115',
  port: 3306,
  user: 'ALIEDU',
  password: 'ALIEDU##23aa',
  database: 'ALIEDU',
  multipleStatements: true
});*/


//Esto es para trabajar con mi BD de manera local, quitar, cuando se conecta al servidor remoto

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;

