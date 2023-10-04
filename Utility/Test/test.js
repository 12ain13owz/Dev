const arr = [
  { id: 1, name: "Test 1" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "Test 3" },
  { id: 4, name: "Test 4" },
  { id: 5, name: "Test 5" },
  { id: 6, name: "Test 6" },
  { id: 7, name: "Test 7" },
];

// function groupbjectBy3(arr) {
//   let i = 0;
//   return arr.reduce(
//     (acc, item) => {
//       const data = { ...item };

//       if (acc[i].length >= 3) {
//         i++;
//         acc.push([]);
//         acc[i].push(data);
//       } else acc[i].push(data);

//       return acc;
//     },
//     [[]]
//   );
// }

// const result = groupbjectBy3(arr);
// console.log(result);

// let groupObjectsByN = (list, n) =>
//   Array(Math.ceil(list.length / n))
//     .fill(1)
//     .map((_, i) => list.slice(i * n, (i + 1) * n));
// let groupObjectsBy3 = (list) => groupObjectsByN(list, 3);

// const result = groupObjectsByN(arr, 3);

// console.log(result);

function delay(seconds, milliseconds = seconds * 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

async function main() {
  console.log(1);
  await delay(2);
  console.log(2);
}

main();
