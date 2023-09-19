const jsonData = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Alice" },
  { id: 4, name: "David" },
];

const uniqueData = [];
const seenNames = new Set();

for (const item of jsonData) {
  if (!seenNames.has(item.name)) {
    uniqueData.push(item);
    seenNames.add(item.name);
  }
}

console.log(uniqueData);
