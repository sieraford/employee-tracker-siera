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

class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    managers() {
        let managersArray = [];
        db.query('SELECT * FROM employee', function (err, results) { 
            for (var i=0; i < results.length; i++) {
              managersArray.push({name: results[i].first_name + ' ' + results[i].last_name, value: results[i].id})
            }
        });
        return managersArray;
    }

   roles() {
        let rolesArray = [];
        db.query('SELECT * FROM role', function (err, results) {
            for (var i=0; i < results.length; i++) {
              rolesArray.push({name: results[i].title, value: results[i].id})
            }
        });
        return rolesArray;
    }

    employees() {
        let employeesArray = [];
        db.query('SELECT * FROM employee', function (err, results) { 
            for (var i=0; i < results.length; i++) {
              employeesArray.push({name: results[i].first_name + ' ' + results[i].last_name, value: results[i].id})
            }
        });
        return employeesArray;
    }
    
    questions = [
        {
          type: 'input',
          name: 'first_name',
          message: 'What is their first name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is their last name?',
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their role?',
          choices: this.roles()
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Who is their manager?',
          choices: this.managers()
        }
    ]

    update_questions = [
        { 
          type: 'list',
          name: 'employee',
          message: 'Which employee do you want to update?',
          choices: this.employees()
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role do you want to assign?',
          choices: this.roles()
        }
    ]

    addRole(title, salary, department) {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department], (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('\n Role successfully added.');
          });
    }

    viewEmployees() {
        db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, manager.first_name AS manager FROM employee employee LEFT JOIN employee manager ON employee.manager_id = manager.id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', function (err, results) {
            console.log('\n')
            console.table(results);
        });
    }

    addEmployee(first_name, last_name, role, manager) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role, manager], (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('\n Employee successfully added.');
          });
    }

    updateEmployeeRole(role, employee) {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role, employee], (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log('\n Employee\'s role successfully updated.');
          });
    }
}

module.exports = Employee;