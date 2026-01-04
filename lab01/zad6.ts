class User {
  constructor(
    protected name: string,
    protected email: string
  ) {}

  getDetails(): { name: string; email: string } {
    return {
      name: this.name,
      email: this.email
    };
  }
}

class Admin extends User {
  constructor(
    name: string,
    email: string,
    private permissions: string[]
  ) {
    super(name, email);
  }

  override getDetails(): {
    name: string;
    email: string;
    permissions: string[];
  } {
    return {
      ...super.getDetails(),
      permissions: this.permissions
    };
  }
}

class Guest extends User {
  constructor(name: string, email: string) {
    super(name, email);
  }

  override getDetails(): string {
    return `Guest user: ${this.name} <${this.email}>`;
  }
}

function printUserDetails(user: User): void {
  console.log(user.getDetails());
}


const user = new User('Jan', 'jan@example.com');
const admin = new Admin('Anna', 'anna@example.com', ['READ', 'WRITE']);
const guest = new Guest('Piotr', 'piotr@example.com');

printUserDetails(user);
printUserDetails(admin);
printUserDetails(guest);
