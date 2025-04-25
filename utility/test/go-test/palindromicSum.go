package main

import (
	"fmt"
)

// จงเขียนโปรแกรมให้ตรงตามเงื่อนไข
// เงื่อนไข : รับ ตัวเลข 3 ตัว (i,j,k) โดยลักษณะการทำงานดังนี้ i + (i+1) + (i+2) + ... + j + (j-1) + (j-2) + ...+k

// ตัวอย่าง
// input i=5, j=9, k=6    การทำงานคือ 5+6+7+8+9+8+7+6 = 56,
// input i=0, j=5, k=-1   การทำงานคือ 0+1+2+3+4+5+4+3+2+1+0+(-1) = 24,
// input i=-5, j=-1, k=-3 การทำงานคือ (-5)+(-4)+(-3)+(-2)+(-1)+(-2)+(-3) = -20

func main() {
	testInput := []int {5, 9, 6}

	fmt.Println("Result (palindromicSum_1):", palindromicSum_1(testInput[0], testInput[1], testInput[2]))
	fmt.Println("Result (palindromicSum_2):", palindromicSum_2(testInput[0], testInput[1], testInput[2]))
}

func palindromicSum_1(i, j, k int) int {
	count := convertToPositive(i-j) + convertToPositive(j-k) + 1
	result := 0

	for l := 0; l < count; l++ {
		if i <= j {
			result += i
			i++
		} else if i > j {
			j--
			result += j
		}
	}
	return result
}

func convertToPositive(n int) int {
	if n < 0 {
		return -n
	}
	return n
}


func palindromicSum_2(i, j, k int) int {
	sum := 0

	for x := i; x <= j; x++ {
		sum += x
	}

	for y := j - 1; y >= k; y-- {
		sum += y
	}

	return sum
}

