package main

import (
	"fmt"
	"strconv"
	"strings"
)

// Input encrypted = ABC, k = 2 => output = YZA,
// Input encrypted = ABC, k = 3 => output = XYZ,
// Input encrypted = VTAOG, k = 2 => output = TRYME,

func main() {
	fmt.Println("Result :", encrypted("ABC", 2))
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