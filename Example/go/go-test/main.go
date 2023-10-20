package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// fmt.Println("Result :", encrypted("VTAOG", 2))
	fmt.Println("Result :", calPlus(-5, -1, 1))
	fmt.Println("Result :", calculateSum(-5, -1, 1))

	// testinput := []int{5, 5, 2, 2, 3, 3}
	// fmt.Println("Result :", isDoubleArray(testinput))
}

func isDoubleArray(testinput []int) string {
	countMap := make(map[int]int)

	for _, num := range testinput {
		countMap[num]++
		// fmt.Println(countMap)
	}

	for _, count := range countMap {
		fmt.Println(countMap)
		if count != 2 {
			return "N"
		}
	}

	return "Y"
}

func encrypted(value string, k rune) string {
	runes := []rune(value)
	result := ""
	n := rune(0)

	for _, v := range runes {
		if v-k < 65 {
			n = v - k + 26
		} else {
			n = v - k
		}
		result += strconv.QuoteRune((n))
	}

	result = strings.ReplaceAll(result, "'", "")
	return result
}

func calPlus(i, j, k int) int {
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

func calculateSum(i, j, k int) int {
	sum := 0

	// Calculate the sum from i to j
	for x := i; x <= j; x++ {
		sum += x
	}

	// Calculate the sum from j-1 to k
	for y := j - 1; y >= k; y-- {
		sum += y
	}

	return sum
}

func convertToPositive(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
