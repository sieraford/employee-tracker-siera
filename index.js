const inquirer = require('inquirer');
const consoleTable = require('console.table');
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

// Question array for main menu prompt
const question = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      "View all departments", 
      "View all roles", 
      "View all employees", 
      "Add a department", 
      "Add a role", 
      "Add an employee", 
      "Update an employee role",
      "Quit"
    ]
  }
];

// Ask user what the would like to do
function promptUser() {
  inquirer
  .prompt(question)
  .then((answers) => {
    checkMenuSelection(answers)
  });
}

// Queries based off user input
function checkMenuSelection(answers) {
  if(answers.menu == "View all departments") {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      promptUser();
    });  
  } else if(answers.menu == "View all roles") {
    db.query('SELECT * FROM role', function (err, results) {
      console.table(results);
      promptUser();
    });
  }  else if(answers.menu == "View all employees") {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;', function (err, results) {
      console.table(results);
      promptUser();
    });
  } else if(answers.menu == "Add a department") {
    dept_question = [
      {
        type: 'input',
        name: 'dept_name',
        message: 'What is the department name?',
      },
    ]
    inquirer
    .prompt(dept_question)
    .then((answers) => {
      let departmentName = answers.dept_name
      db.query(`INSERT INTO department (name) VALUES (?)`, departmentName, (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Department successfully added.');
      });
      promptUser();
    });
  }  else if(answers.menu == "Add a role") {
    db.query('SELECT * FROM department', function (err, results) {
      let departmentsArray = [];
      for (var i=0; i < results.length; i++) {
        departmentsArray.push({name: results[i].name, value: results[i].id})
      }
      role_questions = [
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
          choices: departmentsArray
        }
      ]

    inquirer
    .prompt(role_questions)
    .then((answers) => {
      let title = answers.role_name
      let salary = answers.salary
      let department = answers.department

      db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department], (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Role successfully added.');
      });
      promptUser();
    });
  });
  } else if(answers.menu == "Add an employee") {
    db.query('SELECT * FROM employee', function (err, results) { 
      let managersArray = [];
      for (var i=0; i < results.length; i++) {
        managersArray.push({name: results[i].first_name + ' ' + results[i].last_name, value: results[i].id})
      }
   
    db.query('SELECT * FROM role', function (err, results) {
      let rolesArray = [];
      for (var i=0; i < results.length; i++) {
        rolesArray.push({name: results[i].title, value: results[i].id})
      }
    
    employee_questions = [
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
        choices: rolesArray
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: managersArray
      }
    ]
    inquirer
    .prompt(employee_questions)
    .then((answers) => {
      let first_name = answers.first_name
      let last_name = answers.last_name
      let role = answers.role
      let manager = answers.manager
      db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role, manager], (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Employee successfully added.');
      });
      promptUser();
    });  
  });
}); 
  }  else if(answers.menu == "Update an employee role") {
    db.query('SELECT * FROM employee', function (err, results) { 
      let employeesArray = [];
      for (var i=0; i < results.length; i++) {
        employeesArray.push({name: results[i].first_name + ' ' + results[i].last_name, value: results[i].id})
      }
   
    db.query('SELECT * FROM role', function (err, results) {
      let rolesArray = [];
      for (var i=0; i < results.length; i++) {
        rolesArray.push({name: results[i].title, value: results[i].id})
      }

    update_questions = [
      { 
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: employeesArray
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to assign?',
        choices: rolesArray
      }
    ]
    inquirer
    .prompt(update_questions)
    .then((answers) => {
      let employee = answers.employee
      let role = answers.role
      db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role, employee], (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log('Employee\'s role successfully updated.');
      });
      promptUser();
    });  
  });
});
  } else {
    return
  }
}

  // Function to initialize app
function init() {
    promptUser(); 
  }

// Function call to initialize app
init();