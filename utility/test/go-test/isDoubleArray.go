package main

import (
	"fmt"
)

// จงสร้าง Function ชื่อ isDoubleArray เพื่อใช้ในการตรวจสอบเงื่อนไขดังนี้กำหนดให้ผลลัพธ์เท่ากับ “Y”
// ถ้าเป็นไปตามเงื่อนไขที่กำหนด และเท่ากับ “N” ถ้าไม่เป็นไปตามเงื่อนไขที่กำหนด
// กำหนดเงื่อนไข “ทุก ๆ ค่าของข้อมูลใน array ต้องมีจำนวนเท่ากับ 2”
// กำหนดรูปแบบของ Function (Signature)string isDoubleArray(testInput []int)

// ตัวอย่าง
// testInput = []int {5, 5, 2, 2, 3, 3}         ได้ผลลัพธ์เท่ากับ “Y” เพราะมี เลข 5 จำนวน 2 ตัว, มีเลข 2 จำนวน 2 ตัว, มีเลข 3 จำนวน 2 ตัว ทุกๆตัวเลขมีจำนวน 2 ตัว
// testInput = []int {1, 8, 1, 8, 8, 4, 4}      ได้ผลลัพธ์เท่ากับ “N” เพราะมีเลข 8 จำนวน 3 ตัว
// testInput = []int {7, -1, 7, 8, -13, -13, 8} ได้ผลลัพธ์เท่ากับ “N” เพราะมีเลข -1 จำนวน 1 ตัว
// testInput = []int {1}                        ได้ผลลัพธ์เท่ากับ “N” เพราะมีเลข 1 จำนวน 1 ตัว
// testInput = []int {}                         ได้ผลลัพธ์เท่ากับ “N” เพราะต้องมีข้อมูลอย่างน้อย 2

func main() {
	testInput := []int {1, 8, 1, 8, 8, 4, 4}
	fmt.Println("Result :", isDoubleArray(testInput))
}

func isDoubleArray(testInput []int) string {
  if (len(testInput) == 0) {
    return "N"
  }

  countMap := make(map[int]int)

	for _, num := range testInput {
		countMap[num]++

    fmt.Println("Result :", countMap[num])

    if (countMap[num] == 2) {
      return "N"
    }
	}

	for _, count := range countMap {
		if count != 2 {
			return "N"
		}
	}

	return "Y"
}