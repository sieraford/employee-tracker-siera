const inquirer = require('inquirer');
const consoleTable = require('console.table');

const Department = require('./lib/Department');
const Role = require('./lib/Role')
const Employee = require('./lib/Employee')

const department = new Department();
const role = new Role();
const employee = new Employee();

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

// Ask user what they would like to do
function promptUser() {
  inquirer
  .prompt(question)
  .then((answers) => {
    checkMenuSelection(answers)
  });
}

// Checks user response and makes queries based off selection
function checkMenuSelection(answers) {
  if(answers.menu == "View all departments") {
    department.viewDepartments();
    promptUser();  
  } else if(answers.menu == "View all roles") {
    role.viewRoles();
    promptUser();
  }  else if(answers.menu == "View all employees") {
    employee.viewEmployees();
    promptUser();
  } else if(answers.menu == "Add a department") {
    inquirer
    .prompt(department.question)
    .then((answers) => {
      let departmentName = answers.dept_name
      department.addDepartment(departmentName)
      promptUser();
    });
  }  else if(answers.menu == "Add a role") {
    inquirer
    .prompt(role.questions)
    .then((answers) => {
      let title = answers.role_name
      let salary = answers.salary
      let department = answers.department
      
      role.addRole(title, salary, department);
      
      promptUser();
    });
  } else if(answers.menu == "Add an employee") {
    inquirer
    .prompt(employee.questions)
    .then((answers) => {
      let first_name = answers.first_name
      let last_name = answers.last_name
      let role = answers.role
      let manager = answers.manager

      employee.addEmployee(first_name, last_name, role, manager)

      promptUser();
    });  

  }  else if(answers.menu == "Update an employee role") {
    inquirer
    .prompt(employee.update_questions)
    .then((answers) => {
      let employeeToUpdate = answers.employee
      let role = answers.role
      employee.updateEmployeeRole(role, employeeToUpdate);
      promptUser();
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