export interface Fruit {
  name: string;
  amount: number;
}

export class Fruit2 {
  constructor(public name: string, public amount: number) {}
}

const object: { fruits: Fruit[] } = {
  fruits: [
    { name: "apple", amount: 5 },
    { name: "banana", amount: 10 },
  ],
};

const fruits: Fruit[] = [
  { name: "apple", amount: 5 },
  { name: "apple", amount: 7 },
];

const object2: { fruits: Fruit2[] } = {
  fruits: [new Fruit2("apple", 5), new Fruit2("banana", 10)],
};

console.log(object.fruits);
// console.log(fruits[0]);
console.log(object2.fruits);
