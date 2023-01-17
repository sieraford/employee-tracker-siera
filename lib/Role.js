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

class Role {
    constructor(id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id
    }

    departments() {
        let departmentsArray = [];
        db.query(`SELECT * FROM department`, (err, results)=>{
            for (var i=0; i < results.length; i++) {
              departmentsArray.push({name: results[i].name, value: results[i].id})
            }
        });
        return departmentsArray;
    }
    
    questions = [
        {
          type: 'input',
          name: 'role_name',
          message: 'What is the role name?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary?',
        },
        {
          type: 'list',
          name: 'department',
          message: 'What is the department?',
          choices: this.departments()
        }
    ]

    viewRoles() {
        db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
            console.table(results);
        });
    }

    addRole(title, salary, department) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department], (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('Role successfully added.');
          });
    }
}

module.exports = Role;