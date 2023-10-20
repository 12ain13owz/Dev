package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/12ain13owz/challenge/binaryConverter"
)

var reader = bufio.NewReader(os.Stdin)

func main() {
	converter := ""
	binary := ""
	var err error

	fmt.Println("1. Convert Binary to Decimal")
	fmt.Println("2. Convert Binary to Octal")
	fmt.Println("3. Convert Binary to Hexadecimal")
	fmt.Println("4. Exit")

	fmt.Print("Choose a choice: ")
	converter, err = reader.ReadString('\n')
	converter = strings.TrimSpace(converter)

	if converter == "4" || len(converter) > 1 {
		fmt.Println("Exit")
		return
	}

	fmt.Print("Input Binary number (8 digits): ")
	binary, err = reader.ReadString('\n')
	binary = strings.TrimSpace(binary)

	err = binaryConverter.CheckBinary(binary)
	if err != nil {
		log.Fatal(err)
	}

	result, err := binaryConverter.Translator(binary, converter)
	fmt.Println("Result:", result)
}
