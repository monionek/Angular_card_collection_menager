const processData = ( name: string, age: number, isActive: boolean, scores: number[], status: 'active'|'inactive' ) => {
    console.log("Name: " + name + ", Status: " + status);
    if (age >= 18) {
        console.log("Adult");
    } else {
        console.log("Minor");
    };
    const averageScore: number = scores.reduce((acc:number, curr: number) => {
        return acc+curr
    }, 0)/scores.length
    console.log(`Average Score: ${averageScore}`);
}

processData("marek", 18, true, [1,2,3], 'active');

