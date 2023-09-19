function isPrime(num) {
  if (num == 2 || num == 3 || num == 5 || num == 7) return true;

  if (num <= 1) return false;
  if (num % 2 == 0) return false;
  if (num % 3 == 0) return false;
  if (num % 5 == 0) return false;
  if (num % 7 == 0) return false;

  return true;

  // Check for divisors from 2 to num itself
  // for (let i = 2; i < num; i++) {
  //   if (num % i === 0) {
  //     return false;
  //   }
  // }
  // return true;
}

function getPrimeNumbers(limit) {
  const primes = [];

  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) primes.push(num);
  }

  return primes;
}

const limit = 200;
const primes = getPrimeNumbers(limit);

console.log(`Prime numbers up to ${limit}:`);
console.log(primes);
