const nums = [3, 2, 3];
const target = 6;

function twoSum(nums, target) {
  let no = [];

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = nums[i] + nums[j];

      if (sum === target) {
        no.push(i);
        no.push(j);
        return no;
      }
    }
  }
}
console.log(twoSum(nums, target));
