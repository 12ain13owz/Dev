const ex = [["01-01-2023", "15:00", "ERROR"]];

// const arr = [1, 1, 2, 6, 6, 6, 4, 4, 4, 4, 5, 5, 3, 3, 3];
// output =    [2, 1, 1, 5, 5, 3, 3, 3, 6, 6, 6, 4, 4, 4, 4];
const arr = [
  1, 1, 2, 6, 6, 6, 4, 4, 4, 4, 5, 5, 3, 3, 3, 7, 9, 9, 8, 8, 8, 10, 10, 10, 10,
  0, -1,
];
const map = new Map();
const dataArr = [];
const result = [];

// 1. ถ้ามีค่า 0 จะเรียงผิด
// for (let value of arr) {
//   if (map.has(value)) map.set(value, map.get(value) + 1);
//   if (!map.has(value)) map.set(value, 1);
// }

// map.forEach((value, key) => {
//   const data = [];
//   for (let i = 0; i < value; i++) {
//     data.push(key);
//   }

//   const index = dataArr.findIndex((item) => item.length > value);
//   if (index === -1) dataArr.push(data);
//   else {
//     const filter = dataArr.filter((item) => item.length === value);

//     if (filter.length > 0) {
//       const index2 = filter.findIndex((item) => item[0] > data[0]);

//       if (index2 === -1) dataArr.splice(index, 0, data);
//       else if (data < 0) dataArr.splice(index2, 0, data);
//       else dataArr.splice(index2 + data.length, 0, data);
//     } else dataArr.splice(index, 0, data);
//   }
// });

// for (const subArray of dataArr)
//   for (const num of subArray) {
//     result.push(num);
//   }

// console.log(dataArr, result);

// 2. ChatGPT
for (let value of arr) map.set(value, (map.get(value) || 0) + 1);
const sort = [...map].sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

for (const [num, freq] of sort) {
  for (let i = 0; i < freq; i++) {
    result.push(num);
  }
}

console.log(sort, result);
