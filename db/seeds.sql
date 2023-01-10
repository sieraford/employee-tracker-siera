INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 175000, 2),
       ("Accountant", 100000, 3),
       ("Sales Representative", 150000, 1),
       ("Lawyer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Dowe", 3, 4),
       ("Sarah", "Leroy", 1, 1),
       ("Bruce", "Smith", 4, 3),
       ("Larry", "Lee", 2, 2);