const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name,id,email,github) {
        super("Engineer",id,email);
        this.github = github;
    }

    getGitHub() {
        console.log(`${this.github}`);
        return `${this.github}`;
    }

    getRole() {
        return "Engineer"
    }
}

module.exports = Engineer;