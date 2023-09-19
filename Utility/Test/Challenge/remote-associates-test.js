// Remote Associates Test
// Example: ROOM /SALTS / BLOOD

// function getQuestionPart(phrases) {  I: phrases[] O: string[]
// return array of three strings that makes a question for "Remote Associates Test"
// }

//Examples
// getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"]);
// Output : ["ROOM", "SALTS", "BLOOD"]
// getQuestionPart(["BEFRIEND", "GIRLFRIEND ", "FRIENDSHIP"]);
// Ouput: ["BE", "GIRL", "SHIP"]

let input = {
  ex1: ["BATHROOM", "BATH SALTS", "BLOODBATH"],
  ex2: ["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"],
};

function getQuestionPart(phrases) {
  if (phrases.length <= 1) return "Data Not Duplicate";
  const questionParts = [];
  const phrase = getWordDuplicate(phrases);

  for (let key of phrases) {
    let txt = key
      .split("BATH")
      .map((txt) => txt.trim())
      .filter((txt) => !!txt);

    questionParts.push(...txt);
  }

  return questionParts;
}

function getWordDuplicate(words) {
  let text = "";
  let result = "";

  for (let word of words[0]) {
    if (!text) text = word;
    else text += word;

    let charecter = words
      .map((value) => value.indexOf(text))
      .filter((value) => value > -1);

    if (charecter.length === words.length) {
      result = text;
    }
  }

  return result;
}

// console.log(getWordDuplicate(input.ex1));

// let a = ["BATHROOM", "BATH SALTS", "BLOODBATH"];
// let b = "BATM";
// let c = a.map((value) => value.indexOf(b)).filter((value) => value > -1);

// console.log(c);

console.log(getQuestionPart(input.ex1));
console.log(getQuestionPart(input.ex2));
