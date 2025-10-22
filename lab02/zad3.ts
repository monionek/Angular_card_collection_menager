class Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public getDetails() {
        return {
            name: this.name,
            salary: this.salary
        }
    }
    protected getName(): string {
        return this.name;
    }

    protected getSalary(): number {
        return this.salary;
    }
}

class Manager extends Employee {
    private department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary);
        this.department = department;
    }
    public override getDetails() {
        return {
            name: this.getName(),
            salary: this.getSalary(),
            department: this.department
        };
    }
}

class Developer extends Employee {
    public programmingLanguages: string[];

    constructor(name: string, salary: number, programmingLanguages: string[]) {
        super(name, salary);
        this.programmingLanguages = programmingLanguages
    }
    public override getDetails() {
        return {
            name: this.getName(),
            salary: this.getSalary(),
            programmingLanguages: this.programmingLanguages
        }
    }
}

const getEmployeeDetails = (employee: Employee): void => {
    console.log(employee.getDetails());
}

const employee = new Employee("Jan Kowalski", 5000);
const manager = new Manager("Anna Nowak", 8000, "IT");
const developer = new Developer("Piotr Wiśniewski", 7000, ["TypeScript", "JavaScript", "Node.js"]);

console.log("🧍‍♂️ Pracownik:");
getEmployeeDetails(employee);

console.log("\n👩‍💼 Menedżer:");
getEmployeeDetails(manager);

console.log("\n💻 Programista:");
getEmployeeDetails(developer);