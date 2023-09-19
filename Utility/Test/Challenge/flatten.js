const test_case = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let result = [];

for (let i = 0; i < test_case.length; i++) {
  let sum = [];
  for (let j in test_case[i]) {
    sum.push(test_case[j][i]);
  }
  result.push(sum);
}

// console.log(test_case);
// console.log(result);

const test_case2 = {
  k_1: 1,
  k_2: 2,
  k_3: {
    nested_k_1: 3,
    nested_k_2: 4,
  },
};

let result2 = [];

for (let key in test_case2) {
  if (typeof test_case2[key] === "number") {
    result2.push(test_case2[key]);
    continue;
  }

  for (let key2 in test_case2[key]) {
    result2.push(test_case2[key][key2]);
  }
}

// console.log(result2);

const flattenDictionary = (inputObject) => {
  let outputArray = [];
  flatRecusive(0, inputObject, outputArray);
  return outputArray;
};

const flatRecusive = (index, inputObject, outputArray) => {
  if (index >= inputObject.length) return;

  console.log(inputObject[index]);

  if (typeof inputObject[index] === "object")
    flatRecusive(0, inputObject[index], outputArray);

  if (typeof inputObject[index] === "number")
    outputArray.push(inputObject[index]);

  //  flatRecusive(index + 1, inputObject, outputArray);
};

//let result3 = flattenDictionary(test_case2);
for (let key in test_case2) {
}
