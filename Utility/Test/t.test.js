let queries = [
  ["Type1", "2013"], // Type1 เช็คจากปี
  ["Type2", "500"], // Type2 เช็คเงินน้อยกว่า
  ["Type3", "500"], // Type3 เช็คเงินมากกว่า
  ["Type1", "2011"],
];

let products = [
  ["key", "50", "2013"],
  ["fan", "100", "2012"],
  ["lock", "150", "2013"],
  ["table", "200", "2011"],
  ["toy", "500", "2011"],
];

let result = [
  ["key", "lock"],
  ["Key", "fan", "lock", "toy"],
  [""],
  ["table", "toy"],
];

let q = queries.length;
let p = products.length;
let re1 = [];

for (let i = 0; i < q; i++) {
  let tmp = [];
  for (let j = 0; j < p; j++) {
    let ans1 = Number(queries[i][1]);
    let ans2 = Number(products[j][2]);
    if (queries[i][0] == "Type1") {
      if (ans1 == ans2) {
        tmp.push(products[j][0]);
      }
    }
    if (queries[i][0] == "Type2") {
      if (ans1 < ans2) {
        tmp.push(products[j][0]);
      }
    }
    if (queries[i][0] == "Type3") {
      if (ans1 > ans2) {
        tmp.push(products[j][0]);
      }
    }
  }
  re1.push(tmp);
}

//console.log(re1);

//let result = [];
queries.map((q) => {
  let tmp = [];

  if (q[0] == "Type1")
    tmp = products.filter((p) => q[1] == p[2]).map((data) => data[0]);

  if (q[0] == "Type2")
    tmp = products.filter((p) => q[1] < p[1]).map((data) => data[0]);

  if (q[0] == "Type3")
    tmp = products.filter((p) => q[1] > p[1]).map((data) => data[0]);

  result.push(tmp);
});

//console.log(result);

let cars = [2, 5, 12, 7];
let k = 3;

let n = cars.length;
let cars_sort = cars.sort((a, b) => a - b);
let min = 0;

for (let i = 0; i < k; i++) {
  let res = cars_sort[i + k - 1] - cars_sort[i] + 1;
  if (res) if (min == 0 || min > res) min = res;
}

console.log(min);
