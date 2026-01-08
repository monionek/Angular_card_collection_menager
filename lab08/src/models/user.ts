export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
}
