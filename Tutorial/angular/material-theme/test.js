let input = [-3, -2, -1, -1, -10];
let min = findMin(input);
let max = findMax(input);
let num = sum(input);

function findMin(value) {
  if (value.length == 0) return 0;

  let min = value[0];
  for (let i = 0; i < value.length; i++) if (min > value[i]) min = value[i];
  return min;
}

function findMax(value) {
  if (value.length == 0) return 0;

  let max = value[0];
  for (let i = 0; i < value.length; i++) if (max < value[i]) max = value[i];
  return max;
}

function sum(array) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) sum += array[i];
  if (sum < 0) return -sum;
  return sum;
}

console.log(min);
console.log(max);
console.log(num);
