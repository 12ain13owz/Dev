const list = [
  { name: "John", city: "New York" },
  { name: "Alice", city: "London" },
  { name: "Bob", city: "New York" },
  { name: "Emma", city: "Paris" },
  { name: "Mike", city: "London" },
  { name: "Sarah", city: "New York" },
];

const result = list.reduce((acc, item) => {
  const key = item.city;
  const prev = acc[key] || [];
  const next = [...prev, item];

  acc[key] = next;
  return acc;
}, {});

console.log(result);
