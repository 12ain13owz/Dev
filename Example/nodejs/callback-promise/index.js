const lib = require("./lib");

// 0
// let no = 0;
// console.log(0);
// for (let i = 1; i < 100_000_000; i++) {
//   no = no + i;
// }
// console.log(no);
// console.log(1);

// 1.1;
// console.log(0);
// lib.callbacksetTimeout(1, 1000);
// console.log(2);
// console.log(3);

// 1.2
// setTimeout(() => {
//   console.log(1);
//   setTimeout(() => {
//     console.log(2);
//     setTimeout(() => {
//       console.log(3);
//       setTimeout(() => {
//         console.log(4);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// 2
const test_1 = () => {
  // 2.1
  // console.log(0);
  // lib.promisesetTimeout(1, 1000);
  // console.log(2);
  // console.log(3);
  // 2.2
  // lib.promisesetTimeout(1, 1000).then(() => {
  //   console.log(2);
  //   console.log(3);
  // });
  // 2.3
  // lib
  //   .promisesetTimeout(1, 1000)
  //   .then(() =>
  //     lib
  //       .promisesetTimeout(2, 1000)
  //       .then(() =>
  //         lib
  //           .promisesetTimeout(3, 1000)
  //           .then(() => lib.promisesetTimeout(4, 1000))
  //       )
  //   );
  // 2.4
  // lib
  //   .promisesetTimeout(1, 1000)
  //   .then(() => lib.promisesetTimeout(2, 1000))
  //   .then(() => lib.promisesetTimeout(3, 1000))
  //   .then(() => lib.promisesetTimeout(4, 1000));
};

// test_1();

// 3
const test_2 = async () => {
  // 3.1
  // console.log(0);
  // await lib.callbacksetTimeout(1, 1000);
  // await lib.callbacksetTimeout(2, 1000);
  // await lib.callbacksetTimeout(3, 1000);
  // console.log(4);
  // 3.2
  // console.log(0);
  // await lib.promisesetTimeout(1, 1000);
  // await lib.promisesetTimeout(2, 1000);
  // await lib.promisesetTimeout(3, 1000);
  // console.log(4);
};

// test_2();

// 4
const test_3 = async () => {
  console.log(0);
  await lib.asyncsetTimeout(1, 1000);
  await lib.asyncsetTimeout(2, 500);
  console.log(3);
};

test_3();
