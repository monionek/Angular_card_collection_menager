function processData(arr) {
  let valueSumActive = 0;
  let reversedNames = [];
  let maxId = arr[0].id;
  let valueWithNameLengthAtLeast3 = 0;

  arr.forEach((item) => {
    if (item.active) {
      valueSumActive += item.value;
    }

    reversedNames.push(item.name.split("").reverse().join(""));

    if (item.id > maxId) {
      maxId = item.id;
    }

    if (item.name.length >= 3) {
      valueWithNameLengthAtLeast3 += item.value;
    }
  });

  return {
    valueSumActive,
    reversedNames,
    maxId,
    valueWithNameLengthAtLeast3,
  };
}

const data = [
  { id: 1, name: "Jan", value: 10, active: true },
  { id: 2, name: "Ola", value: 5, active: false },
  { id: 3, name: "Piotr", value: 20, active: true },
  { id: 4, name: "Al", value: 7, active: true },
];

console.log(processData(data));
