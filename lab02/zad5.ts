type Schema = {
  [key: string]: "string" | "number" | "boolean";
};

function validateObject<T extends object>(obj: T, schema: Schema): boolean {
  for (const key in schema) {
    if (!(key in obj)) {
      return false;
    }
    const expectedType = schema[key];
    if (typeof (obj as any)[key] !== expectedType) {
      return false;
    }
  }

  return true;
}

const userSchema: Schema = {
  name: "string",
  age: "number",
  isActive: "boolean"
};

const validUser = {
  name: "Ala",
  age: 25,
  isActive: true
};

const invalidUser = {
  name: "Ola",
  age: "25",
  isActive: true
};

console.log(validateObject(validUser, userSchema));
console.log(validateObject(invalidUser, userSchema));