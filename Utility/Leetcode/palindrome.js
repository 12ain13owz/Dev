const x = 121;

// function isPalindrome(x) {
//   let front = x;
//   let back = "";

//   for (let i = 0; i <= x.toString().length; i++) {
//     // front = front + Number(x.toString().substring(i));
//     back =
//       back +
//       x
//         .toString()
//         .substring(x.toString().length - i - 1, x.toString().length - i);
//   }

//   console.log(front, back);
//   if (front === +back) return true;
//   return false;
// }

// console.log(isPalindrome(x));

function isPalindrome(x) {
  let front = 0;
  let back = "";

  for (let i = 0; i <= x.toString().length; i++) {
    back =
      back +
      x
        .toString()
        .substring(x.toString().length - i - 1, x.toString().length - i);
  }

  if (front === +back) return true;
  return false;
}

console.log(isPalindrome(x));
