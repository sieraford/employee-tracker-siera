const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Pass123#',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
      }

    question = [
        {
          type: 'input',
          name: 'dept_name',
          message: 'What is the department name?',
        },
    ]
    
    addDepartment(name) {
        db.query(`INSERT INTO department (name) VALUES (?)`, name, (err, results) => {
            if (err) {
            console.log(err);
            }
            console.log('\n Department successfully added.');
        });
    }

    viewDepartments() {
        db.query('SELECT * FROM department', function (err, results) {
            console.log('\n') 
            console.table(results);
        });
    }
}

module.exports = Department;