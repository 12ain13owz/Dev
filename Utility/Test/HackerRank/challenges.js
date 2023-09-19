// 1. Plus Minus
function plusMinus(arr) {
  // Write your code here
  let pos_count = 0;
  let neg_count = 0;
  let zero_count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) pos_count++;
    if (arr[i] < 0) neg_count++;
    if (arr[i] == 0) zero_count++;
  }

  let pos = (pos_count / arr.length).toFixed(6);
  let neg = (neg_count / arr.length).toFixed(6);
  let zero = (zero_count / arr.length).toFixed(6);

  // console.log(pos);
  // console.log(neg);
  // console.log(zero);

  let result = [];
  result.push(pos);
  result.push(neg);
  result.push(zero);

  return result;
}

// 2. Mini-Max Sum
function miniMaxSum(arr) {
  // Write your code here
  arr.sort((a, b) => a - b);

  let minimun = 0;
  let maximum = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    minimun = minimun + arr[i];
    maximum = maximum + arr[i + 1];
  }

  // console.log(minimun, maximum);
  let result = {
    minimun: minimun,
    maximum: maximum,
  };

  return result;
}

// 3. Time Conversion
function timeConversion(s) {
  // Write your code here
  let [hours, minutes, seconds] = s.split(":");
  let pmTime = seconds.slice(2);
  seconds = seconds.substring(0, 2);

  if (hours == "12") hours = "00";
  if (pmTime == "PM") hours = Number(hours) + 12;
  let time = `${hours}:${minutes}:${seconds}`;

  return time;

  // let s = "07:05:45PM";
  // let time = s.substring(8, 0).split(":");
  // let amTime = s.substring(8) == "AM" ? true : false;
  // let hour = 0;

  // if (time[0] == "00") hour = "00";
  // if (!amTime) hour = Number(time[0]) + 12;
  // result = `${hour}:${time[1]}:${time[2]}`;
}

// 3. Sparse Arrays
function matchingStrings(strings, queries) {
  // Write your code here
  const text = new Map();
  for (let s of strings) {
    if (text.has(s)) text.set(s, text.get(s) + 1);
    if (!text.has(s)) text.set(s, 1);
  }

  return queries.map((q) => text.get(q) || 0);
}

// 4-1. Lonely Integer
function lonelyinteger_1(a) {
  // Write your code here
  let number = new Map();
  let result = 0;

  for (let n of a) {
    if (number.has(n)) number.set(n, number.get(n) + 1);
    if (!number.has(n)) number.set(n, 1);
  }

  number.forEach((value, key) => {
    if (value == 1) {
      result = key;
      return;
    }
  });

  return result;
}

// 4-2. Lonely Integer
function lonelyinteger_2(a) {
  // Write your code here
  let number = new Map();
  let result = 0;

  for (let n of a) {
    if (number.has(n)) number.set(n, number.get(n) + 1);
    if (!number.has(n)) number.set(n, 1);
  }

  return (result = [...number.entries()]
    .filter(({ 1: v }) => v == 1)
    .map((k) => k[0]));
}

// 5. Flipping bits
function flippingBits(n) {
  // Write your code here
  return 2 ** 32 - 1 - n;
}

// 6. Diagonal Difference
function diagonalDifference(arr) {
  // Write your code here
  let n = arr.length;
  let d1 = 0;
  let d2 = 0;

  for (let i = 0, j = n - 1; i < n; i++, j--) {
    d1 += arr[i][i];
    d2 += arr[i][j];
  }

  return Math.abs(d1 - d2);
}

// 7. Compare the Triplets
function compareTriplets(a, b) {
  let alice = 0;
  let blob = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) alice++;
    if (a[i] < b[i]) blob++;
  }

  return [alice, blob];
}

// 8. A Very Big Sum
function aVeryBigSum(ar) {
  // Write your code here
  // 1. return ar.reduce((sum, num) => BigInt(sum) + BigInt(num));

  // 2.
  let result = 0;
  for (let n of ar) result += n;
  return result;
}

// 9. Staircase
function staircase(n) {
  // Write your code here
  let output = "";
  let result = [];

  for (let i = 1; i <= n; i++) {
    for (let j = n; j >= 1; j--) {
      if (j <= i) output += "#";
      else output += " ";
    }
    result.push(output);
    console.log(output);
    output = "";
  }

  return result;
}

// 10. Birthday Cake Candles
function birthdayCakeCandles(candles) {
  // Write your code here
  let result = 0;
  let max = 0;

  for (let n of candles) {
    if (max < n) {
      max = n;
      result = 0;
      result++;
    } else if (max == n) result++;
  }

  return result;
}

// 11. Counting Sort 1
function countingSort(arr) {
  // Write your code here

  // 1
  // const result = [];
  // for (let n in arr) {
  //   if (Number(n) < 100) if (!result[n]) result[n] = 0;
  //   if (!result[arr[n]]) result[arr[n]] = 0;
  //   result[arr[n]] += 1;
  // }
  // return result;

  // 2
  const result = new Array(100).fill(0);
  for (let n in arr) result[arr[n]] += 1;
  return result;
}

function pangrams(s) {
  // Write your code here

  // 1.
  // let text = s.split(" ").join("").toLowerCase();
  // let map = new Map();

  // for (let i = 97; i <= 122; i++) map.set(String.fromCharCode(i), 0);
  // for (let t of text) if (map.has(t)) map.set(t, map.get(t) + 1);
  // for (let [key, value] of map) if (value === 0) return "not pangram";

  // return "pangram";

  // 2.
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const setAlphabet = new Set(alphabet);
  const setString = new Set(s.toLowerCase());

  if (setString.size < 26) return "not pangram";
  for (let value of setString) {
    setAlphabet.delete(value);
    if (setAlphabet.size == 0) return "pangram";
  }
  return "not pangram";
}

// 13. Permuting Two Arrays
function twoArrays(k, A, B) {
  // Write your code here
  const rounds = A.length;
  const a_sort = A.sort((a, b) => a - b);
  const b_sort = B.sort((a, b) => a - b).reverse();
  // const b_sort = B.sort((a, b) => (a > b ? -1 : 1));

  for (let i = 0; i <= rounds; i++) {
    let sum = a_sort[i] + b_sort[i];
    if (sum < k) return "NO";
  }

  return "YES";
}

// 14. Subarray Division 1
function birthday(s, d, m) {
  // Write your code here
  const rounds = s.length;
  const arr1 = [];
  let arr2 = [];
  let sum = 0;

  for (let i = 0; i < rounds; i++) {
    arr2 = [];
    sum = 0;
    for (let j = 0; j < m; j++) {
      sum += s[i + j];
      arr2.push(s[i + j]);
    }
    if (sum === d) arr1.push(arr2);
  }

  return new Set(arr1.map((value) => JSON.stringify(value))).size;
}

// 15. XOR Strings 2
function stringsXOR(s) {
  let arr = s.split("\n");
  let result = "";

  for (let i in arr[0]) {
    let s1 = arr[0].substr(i, 1);
    let s2 = arr[1].substr(i, 1);

    if (s1 != s2) result += "1";
    else result += "0";
  }

  return result;
}
module.exports = {
  plusMinus,
  miniMaxSum,
  timeConversion,
  matchingStrings,
  lonelyinteger_1,
  lonelyinteger_2,
  flippingBits,
  diagonalDifference,
  compareTriplets,
  aVeryBigSum,
  staircase,
  birthdayCakeCandles,
  countingSort,
  pangrams,
  twoArrays,
  birthday,
  stringsXOR,
};
