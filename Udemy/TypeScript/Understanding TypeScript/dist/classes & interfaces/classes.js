"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private id: string;
        // private name: string;
        // private employees: string[] = []; only accessible in this particular class
        this.employees = []; // can be accessed from extended classes
        // this.name = n;
        // console.log(this.fiscalYear) error: static variables are detached(inaccessible) from instances.
    }
    static createEmployee(name) {
        return { name };
    }
    addEmployee(employee) {
        // this.id = 'd2' => error: readonly
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length, this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT"); // calls parent class' constructor
        this.admins = admins;
    }
    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        // getter should have return statement
        if (!this.lastReport)
            throw new Error("No report found");
        return this.lastReport;
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error("Plz pass in a value");
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "AC");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
    addEmployee(name) {
        if (name === "Max")
            return;
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
// const accounting = new AccountingDepartment("a1", []);
// singleton pattern -> private constructor
const accounting = AccountingDepartment.getInstance();
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe(); // `name` property will be undefined,
// since `describe` method was called on `accountingCopy` object
// adding describe(this: Department) will create an error in accountingCopy.describe()
// adding missing property to accountingCopy object removes the error
accounting.addEmployee("Max");
accounting.addEmployee("Yun");
// accounting.name = 'Accounting'
// accounting.employees[2] = 'Anna'
accounting.describe();
accounting.printEmployeeInformation();
// getters and setters do not need ()
accounting.mostRecentReport = "Year End Report";
console.log(accounting.mostRecentReport);
// static
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
// abstract classes cannot be instantiated
