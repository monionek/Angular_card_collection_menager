export interface User {
    id: number,
    name: string,
    surname: string,
    phoneNumber: string,
    birthYear: number,
    adress: {
        street: string,
        houseNumber: number,
        appartmentNumber: number,
        postalCode: string,
        city: string
    }
}