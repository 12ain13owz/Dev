// function search(arr, value) {
//   for (const key of arr) {
//     if (key === value) return `Found! ${value}`;
//   }
//   return "Not Found!";
// }

// array = [7, 16, 2, 0, 5, 1, 30];
// number = 7;

// console.log(search(array, number));

function binarySearch(arr, value) {
  let begin = 0;
  let end = arr.length - 1;
  let mid;

  while (begin <= end) {
    mid = Math.floor((begin + end + 1) / 2);

    if (arr[mid] == value) return mid;
    if (arr[mid] < value) begin = mid + 1;
    if (arr[mid] > value) end = mid - 1;
  }

  return -1;
}

arr = [6, 17, 18, 19, 23, 25, 33, 35];
x = 17;

console.log(binarySearch(arr, x));
