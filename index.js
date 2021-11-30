const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// build a Node.js command-line application that takes in information about employees on a software engineering team, 
// then generates an HTML webpage that displays summaries for each person

// I WANT to generate a webpage that displays my team's basic info
// SO THAT I have quick access to their emails and GitHub profiles

// GIVEN a command-line application that accepts user input

// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input

// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address

// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number

// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu

// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu

// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

// ------------------------------------------------------------------------------------------------------- //

//database to store all employees
const allEmployees = [];

const createEmployee = () => {
// used to store if user selected either Manager, Engineer or Intern
    let role = ''
// used to store the input responses made by user so that we can create our corresponding classes
    let basicData;
    inquirer.prompt([

        {
            type: 'name',
            message: 'Enter the employee name: \n\n',
            name: 'title'
        },
    
        {
            type: 'number',
            message: 'Enter the employee ID: \n\n',
            name: 'ID'
        },

        {
            type: 'input',
            message: 'Enter the employee email: \n\n',
            name: 'email'
        },

// if user selected engineer, allow user to enter username
// else if user selected intern, allow user to enter school
// user has option to either add another employee or create HTML based off selections
        {
            type: 'list',
            message: 'Select which you are adding\n\n',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'selection'
        }

// generate specific question based off above user selection
    ]).then(response => {
        role = response.selection
        basicData = response
        inquirer.prompt([
            {
                when: () => response.selection === "Manager",
                type: 'number',
                message: 'Enter the employee office number\n\n',
                name: 'officeNumber'
            },

            {
                when: () => response.selection === "Engineer",
                type: 'input',
                message: 'Enter the github username\n\n',
                name: 'github'
            },

            {
                when: () => response.selection === "Intern",
                type: 'input',
                message: 'Enter the school name\n\n',
                name: 'school'
            },

// generate specific question based off user selection
            {
                type:'input',
                message: 'Enter Y/y to add another employee or N/n to exit and create the document!\n\n',
                name: 'addEmployee'
            },
        ])

        
        .then((results) => {
            // variable to store each employee we create in new class
            let newEmployee;
            switch (response.selection) {
                case "Manager":
                    newEmployee = new Manager(basicData.title,basicData.ID,basicData.email,results.officeNumber);
                    console.log("NEW EMPLOYEE", newEmployee.getRole());
                    break;

                case "Engineer":
                    newEmployee = new Engineer(response.title,response.ID,response.email,results.github);
                    console.log("NEW ROLE", newEmployee.getRole());
                    break;

                case "Intern":
                    newEmployee = new Intern(response.title,response.ID,response.email,results.school);
                    console.log("NEW ROLE", newEmployee.getRole());
                    break;
            
                default:
                    break;
            }
            
// push all the responses the user inputted in the all employees array
            allEmployees.push(newEmployee);
// call the createEmployee() function to allow user to add more employees
            // console.log("ALL EMPLOYEES", allEmployees);

    //***** if user selects yes, allow user to add another employee while adding previously selected employees*****// 
            if (results.addEmployee === "Y" || results.addEmployee === "y") {
                createEmployee();
            }

    //***** if user selects no and does not want to add anymore employees do the following *****//
    //***** add all the created employees to the allEmployee database */
    //***** do for each method on each employee in allEmployees database and add to corresponding class (Engineer,Manager,or Intern) based of selection key  */ 
    //***** run the generateHTML function based off   */
            else {
    // create a template to take employees from allEmployees database and add to our custon HTML
                const templateHTML = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Employee Generator</title>
                    <link href="/assets/styles.css" rel="stylesheet" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&family=Lato:ital,wght@1,700&family=Montserrat&family=Open+Sans:wght@500&family=Roboto:wght@500&display=swap" rel="stylesheet">                  </head>
                  <body>
                    <section class="section">
                        <div class="container">
                            <h1 class="title">
                                The A Team!
                            </h1>
                            </br>
                            </br>
                            <div class="columns is-multiline">
                                ${allEmployees.map(value => {
                                    // take each value in allEmployees and map to card element
                                    console.log("VALUE ROLE", value.getRole())
                                    return `
                                    <div class="d-flex justify-content-center section">
                                        <div class="rounded col-lg-6 col-md-6 col-sm-12 p-2 card">
                                            <div class="card-content">
                                                <div class="content">
                                                    <h3> Name: ${value.name}</h3>
                                                    <h6>  Role: ${value.getRole()} </h6>
                                                    <p> ID: ${value.id} </p>
                                                    <p> Email: ${value.email} </p>
                                                    ${(
                                                        () => { 
                                                        if (value.getRole() === "Manager") {
                                                            return `<p>Office Number: ${value.getOfficeNumber()}</p>`
                                                        } else if (value.getRole() === "Engineer") {
                                                            return `<a href="https://github.com/${value.getGitHub()}"><p class="github">Github</p> </a>`
                                                        } else if (value.getRole() === "Intern") {
                                                            return `<p>School: ${value.getSchool()}</p>`
                                                        } else {
                                                            return ""
                                                        }
                                                        })
                                                    ()}                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                                })}
                            </div>
                        </div>
                    </section>
                  </body>
                </html>
                `
            // fs writefile with that html as index.html
            fs.writeFileSync("index.html", templateHTML);
            }
        })
    .catch((error) => (console.log(error)));
    })
}

createEmployee();



