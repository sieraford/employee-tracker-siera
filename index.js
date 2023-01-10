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
      "Update an employee role"
    ]
  }
];

function checkMenuSelection(answers) {
  if(answers.menu == "View all departments") {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });  
  } else if(answers.menu == "View all roles") {
    db.query('SELECT * FROM role', function (err, results) {
      console.table(results);
    });
  }  else if(answers.menu == "View all employees") {
    // presented with a formatted table showing employee data, including employee ids, 
    // first names, last names, job titles, departments, salaries, and managers that 
    // the employees report to 
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN;', function (err, results) {
      console.table(results);
    });
  } else if(answers.menu == "Add a department") {
    // prompted to enter the name of the department and that department is added to the database
  }  else if(answers.menu == "Add a role") {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
  } else if(answers.menu == "Add an employee") {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  }  else if(answers.menu == "Update an employee role") {
    // prompted to select an employee to update and their new role and this information is updated in the database
  }
  else {
    // end application
  }
}

  // Function to initialize app
function init() {
    inquirer
    .prompt(question)
    .then((answers) => {
      checkMenuSelection(answers)
    });
  
  }

// Function call to initialize app
init();