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

// Array of questions for user input
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

function promptUser() {
  inquirer
  .prompt(question)
  .then((answers) => {
    checkMenuSelection(answers)
  });
}

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
        console.table(results);
      });
      promptUser();
    });
  }  else if(answers.menu == "Add a role") {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
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
        choices: [ "Dept 1", "Dept 2", "Dept 3"]
      }
    ]
    inquirer
    .prompt(role_questions)
    .then((answers) => {
      let title = answers.role_name
      let salary = answers.salary
      let department = answers.department
      db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, (title, salary, department), (err, results) => {
        if (err) {
          console.log(err);
        }
        console.table(results);
      });
      promptUser();
    });
  } else if(answers.menu == "Add an employee") {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  }  else if(answers.menu == "Update an employee role") {
    // prompted to select an employee to update and their new role and this information is updated in the database
  }
  else {
    return
  }
}

  // Function to initialize app
function init() {
    promptUser(); 
  }

// Function call to initialize app
init();