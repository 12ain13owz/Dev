import "./style.css";

const Relation = [
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

const Node = [
  { id: 1, name: 1, isEnable: "Y" },
  { id: 2, name: 2, isEnable: "Y" },
  { id: 3, name: 3, isEnable: "Y" },
  { id: 4, name: 4, isEnable: "Y" },
  { id: 5, name: 5, isEnable: "Y" },
  { id: 6, name: 6, isEnable: "Y" },
  { id: 7, name: 7, isEnable: "Y" },
  { id: 8, name: 8, isEnable: "N" },
  { id: 9, name: 9, isEnable: "Y" },
];

function GetRemainingNode(param: number): number | null {
  let RemaingNode = 0;
  let i = 0;
  if (param === 1) return 0;

  let node = Relation.find((value) => value.id === param);
  if (!node?.beforeId) return null;

  let enable = Node.find((value) => value.id === node?.id)?.isEnable;
  if (enable === "N") return null;

  enable = Node.find((value) => value.id === node?.beforeId)?.isEnable;
  if (enable === "Y")
    RemaingNode = Relation.filter((value) => value.id === param).length;
  else {
    while (RemaingNode == 0) {
      node = Relation.find((value) => value.id === node?.beforeId);
      enable = Node.find((value) => value.id === node?.beforeId)?.isEnable;

      if (enable === "Y") {
        RemaingNode = Relation.filter((value) => value.id === node?.id).length;
        break;
      }

      i++;
      if (i > Relation.length) return null;
    }
  }

  return RemaingNode;
}

console.log(GetRemainingNode(9));
