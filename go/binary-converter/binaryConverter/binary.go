package binaryConverter

import (
	"fmt"
	"math"
	"regexp"
	"strconv"
)

func Translator(binary, converter string) (string, error) {
	var err error
	var output int
	var outputString string
	var result string
	num, err := strconv.Atoi(binary)

	switch converter {
	case "1": // decimal
		output = binaryToDecimal(num)
		break
	case "2": // octal
		output = binarytoOctal(binaryToDecimal(num))
		break
	case "3": // hexadecimal
		output = 0
		outputString = binarytoHexadecimal(binaryToDecimal(num))
		break
	default:
		err = fmt.Errorf("ไม่สามารถแปลงข้อมูลได้")
		break
	}

	if output != 0 {
		result = strconv.Itoa(output)
	} else {
		result = outputString
	}

	return result, err
}

func CheckBinary(binary string) error {
	match, err := regexp.MatchString("^[01]+$", binary)
	if err != nil {
		return err
	}
	if !match {
		return fmt.Errorf("Binary ไม่เท่ากับ 0 หรือ 1")
	}
	if len(binary) != 8 {
		return fmt.Errorf("Binary ไม่ครบ 8 หลัก")
	}
	return nil
}

func binaryToDecimal(number int) int {
	var remainder int
	index := 0
	decimal := 0
	for number != 0 {
		remainder = number % 10
		number = number / 10
		decimal = decimal + remainder*int(math.Pow(2, float64(index)))
		index++
	}

	return decimal
}

func binarytoOctal(number int) int {
	octal := 0
	counter := 1
	remainder := 0
	for number != 0 {
		remainder = number % 8
		number = number / 8
		octal += remainder * counter
		counter *= 10
	}
	return octal
}

func binarytoHexadecimal(number int) string {
	Hexadecimal := strconv.FormatInt(int64(number), 16)
	return Hexadecimal
}
