const inquirer = require("inquirer");
const fs = require("fs");
const employee = require("./lib/Employee");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const manager = require("./lib/Manager");

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

    // generate specific question based off user selection
    ]).then(response => {
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


            {
                type:'input',
                message: 'Enter Y/y to add another employee or N/n to exit and create the document!\n\n',
                name: 'addEmployee'
            },
        ])
        // if user selects yes, rerun the generatEmployee function
        .then((results) => {

            if (results.addEmployee === "Y" || results.addEmployee === "y") {
        // remove add employee key from 'results' object as this info is not needed to add to HTML
                delete results["addEmployee"];
        // take each item in results and add to response object
        //NOTE: response contains the answers user inputted AND
        //results contains user inputs based off specific selection of either manager,engineer or intern
        //the purpose of this is to combine into one object to include either officenumber, github or school name
                for (item in results) {
                    response[item] = results[item];
                }

        // push all the responses the user inputted in the all employees array
                
                allEmployees.push(response);
                console.log("***ALL EMPLOYEES*****", allEmployees);
                createEmployee();
            }
            
            else {
                console.log("***EMPLOYEES LIST*****", allEmployees);

                return true;
        // if user is done, do the following steps
        //         
            }
        })
    .catch((error) => (console.log(error)));
    })
}

createEmployee();



