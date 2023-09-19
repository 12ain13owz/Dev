const arr = [
  [112, 42, 83, 119],
  [56, 125, 56, 49],
  [15, 78, 101, 43],
  [62, 98, 114, 108],
];

let sum = [];
let i = 0;
let arr2 = [];

for (const row of arr) {
  i = 0;
  for (const col of row) {
    if (sum[i]) sum[i] += col;
    else sum[i] = col;
    i++;
  }
}
let colMax = Math.max(...sum);
let colIndex = sum.findIndex((value) => value === colMax);

for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i][colIndex]);
}

arr2.reverse();

for (let i = 0; i < arr.length; i++) {
  arr[i][colIndex] = arr2[i];
}

arr[0].reverse();
let result = arr[0][0] + arr[0][1] + arr[1][0] + arr[1][1];

console.log(result);
