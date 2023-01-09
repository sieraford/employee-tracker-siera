const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Pass123#',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
  });