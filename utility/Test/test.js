const tableProgresslog = [
  { runDate: "01/01/2019", id: 1, remainingNode: 0 },
  { runDate: "01/01/2019", id: 2, remainingNode: 1 },
  { runDate: "01/01/2019", id: 3, remainingNode: 1 },
  { runDate: "01/01/2019", id: 4, remainingNode: 1 },
  { runDate: "01/01/2019", id: 5, remainingNode: 1 },
  { runDate: "01/01/2019", id: 6, remainingNode: 2 },
  { runDate: "01/01/2019", id: 7, remainingNode: 1 },
  { runDate: "01/01/2019", id: 9, remainingNode: 3 },
];

const tableRelation = [
  { id: 2, beforeId: 1 },
  { id: 3, beforeId: 2 },
  { id: 4, beforeId: 2 },
  { id: 5, beforeId: 2 },
  { id: 6, beforeId: 5 },
  { id: 6, beforeId: 3 },
  { id: 7, beforeId: 5 },
  { id: 8, beforeId: 7 },
  { id: 8, beforeId: 6 },
  { id: 8, beforeId: 3 },
  { id: 9, beforeId: 8 },
];

const tableNode = [
  { id: 1, name: 1, isEnabled: "Y" },
  { id: 2, name: 2, isEnabled: "Y" },
  { id: 3, name: 3, isEnabled: "Y" },
  { id: 4, name: 4, isEnabled: "Y" },
  { id: 5, name: 5, isEnabled: "Y" },
  { id: 6, name: 6, isEnabled: "Y" },
  { id: 7, name: 7, isEnabled: "Y" },
  { id: 8, name: 8, isEnabled: "N" },
  { id: 9, name: 9, isEnabled: "Y" },
];

const GetRemainingNode = (id) => {
  const beforeId = tableRelation.find((data) => data.id === id)?.beforeId;
  // const isEnabled = tableNode.

  console.log(beforeId);
  return 0;
};

const result = GetRemainingNode(9);
// console.log(result);
