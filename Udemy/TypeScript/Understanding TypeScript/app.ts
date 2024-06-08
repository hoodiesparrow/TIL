class Department {
  static fiscalYear = 2020;
  // private id: string;
  // private name: string;
  // private employees: string[] = []; only accessible in this particular class
  protected employees: string[] = []; // can be accessed with extended classes

  constructor(private readonly id: string, public name: string) {
    // this.name = n;
  }

  static createEmployee(name: string) {
    return { name };
  }

  describe(this: Department) {
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(employee: string) {
    // this.id = 'd2' => error: readonly
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length, this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT"); // calls parent class' constructor
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    // getter should have return statement
    if (!this.lastReport) throw new Error("No report found");
    return this.lastReport;
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("Plz pass in a value");

    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "AC");
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "Max") return;
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}
const accounting = new AccountingDepartment("a1", []);

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
