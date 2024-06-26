const filters = {
  name: ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6", "Test 7"],
  category: [],
};

const status = true;
const print = true;

const data = [
  { id: 1, name: "Test 1", category: "foo1", status: false, print: true },
  { id: 2, name: "Test 2", category: "foo2", status: false, print: false },
  { id: 3, name: "Test 3", category: "foo2", status: true, print: true },
  { id: 4, name: "Test 4", category: "sad3", status: false, print: true },
  { id: 5, name: "Test 5", category: "foo1", status: false, print: true },
  { id: 6, name: "Test 6", category: "bar2", status: false, print: true },
  { id: 7, name: "Test 7", category: "foo1", status: true, print: false },
];

const filteredData1 = Object.keys(filters).reduce((result, keyName) => {
  return result.filter((item) => {
    if (filters[keyName].length === 0) return result;
    return filters[keyName].includes(item[keyName]);
  });
}, data);

const filteredData2 = filteredData1.filter((item) => {
  if (item.status && status) return item;
  if (item.print && print) return item;
});

console.log(filteredData2);

// const filters1 = {
//   category: ["foo2", "bar2", "sad3"],
//   status: [true],
// };

// const filters2 = {
//   category: ["foo1", "bar2"],
//   status: [],
// };

// const data = [
//   { id: 1, name: "Test 1", category: "foo1", status: true },
//   { id: 2, name: "Test 2", category: "foo2", status: true },
//   { id: 3, name: "Test 3", category: "foo2", status: true },
//   { id: 4, name: "Test 4", category: "sad3", status: false },
//   { id: 5, name: "Test 5", category: "foo1", status: true },
//   { id: 6, name: "Test 6", category: "bar2", status: false },
//   { id: 7, name: "Test 7", category: "bar2", status: true },
// ];

// function filterData(data, filters) {
//   const isFiltersEmpty = Object.keys(filters).every(
//     (key) => filters[key].length === 0
//   );

//   if (Object.keys(filters).length === 0 || isFiltersEmpty) {
//     return data;
//   }

//   const filteredData = data.filter((item) => {
//     for (const key in filters) {
//       if (filters[key].length > 0 && !filters[key].includes(item[key])) {
//         return false;
//       }
//     }
//     return true;
//   });

//   return filteredData;
// }

// const filteredData1 = filterData(data, filters1);
// console.log(filteredData1);

// const filteredData2 = filterData(data, filters2);
// console.log(filteredData2);
