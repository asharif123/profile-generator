const Employee = require("./Employee");

class Intern extends Employee {
    constructor(school) {
        super("Intern",id,email);
        this.school = school;
    }

    getSchool() {
        console.log(`${this.school}`);
        return `${this.school}`;
    }

    getRole() {
        console.log("Intern");
        return "Intern";
    }
}

module.exports = Intern;