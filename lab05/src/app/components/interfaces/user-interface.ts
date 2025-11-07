import AdressInterface from "./adress-interface";

export default interface UserInterface {
    id: string,
    name: string,
    surname: string,
    phoneNumber: number,
    birthYear: number,
    adress: AdressInterface
}