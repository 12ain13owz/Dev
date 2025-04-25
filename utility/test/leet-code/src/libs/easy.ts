export const easy = {
  // * Input nums = [2,7,11,15], target = 9
  // ? Output  [0,1]

  twoSum(nums: number[], target: number): number[] | null {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        let sum: number = nums[i] + nums[j];
        if (sum === target) return [i, j];
      }
    }

    return null;
  },
};
