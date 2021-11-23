const Employee = require("./Employee");

class Manager extends Employee {
    constructor(officeRole) {
        super("Manager",id,email);
        this.officeRole = officeRole;
    }

    getofficeNumber() {
        console.log(`${this.officeRole}`);
        return `${this.officeRole}`;
    }

    getRole() {
        console.log("Manager");
        return "Manager";
    }
}

module.exports = Manager;