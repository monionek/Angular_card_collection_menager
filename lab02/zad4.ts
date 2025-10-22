function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error("Oba argumenty muszą być tablicami!");
    }

    return [...arr1, ...arr2];
}

const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];
const mergedNumbers = mergeArrays(numbers1, numbers2);
console.log(mergedNumbers); 

const names1 = ["Ala", "Ola"];
const names2 = ["Tomek", "Jan"];
const mergedNames = mergeArrays(names1, names2);
console.log(mergedNames);

interface Product2 {
    id: number;
    name: string;
}

const productsA: Product2[] = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Telefon" }
];

const productsB: Product2[] = [
    { id: 3, name: "Tablet" }
];

const mergedProducts = mergeArrays(productsA, productsB);
console.log(mergedProducts);
