const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(github) {
        super("Engineer",id,email);
        this.github = github;
    }

    getGitHub() {
        console.log(`${this.github}`);
        return `${this.github}`;
    }

    getRole() {
        console.log("Engineer")
        return "Engineer"
    }
}

module.exports = Engineer;