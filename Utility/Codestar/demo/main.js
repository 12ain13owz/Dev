var w = [22.7, 10.5, 28.3, 24.7, 25.8, 18.6]

//for (var i of w)if (i > 25.0) console.log(i)

var coffee = ['Latte', 'Mocha', 'Latte', 'Americano',
    'Latte', 'Mocha', 'Mocha', 'Latte', 'Mocha'
]
var count = 0

for (var i of coffee)
    if (i == 'Mocha') count = count + 1

    //console.log(count)

var buy = [25, 30, 70, 40]
var sell1 = [32, 48, 65, 42]
var calc = 0

for (var i in buy) calc = calc + (sell1[i] - buy[i])
    //console.log(calc)

var book = ['Biology', 'Calculus', 'Astronomy', 'Physice', 'Chemistry']
book.sort()
    //book.reverse()
    //console.log(book)

var data = [7, 10, 15]
data.sort(compare)
    //console.log(data)

function compare(x, y) {
    return x.price - y.price // เฉพาะเรียงตัวเลข
        /*
        if (x.price < y.price) return -1
        if (x.price > y.price) return +1
        return 0
        */
}

var score = [8.5, 9.2, 8.7, 7.9, 9.2, 8.6, 8.3]
score.sort(compare)

var c = 0
for (var i of score) {
    c = c + i
}

c = c - score[0]
c = c - score[score.length - 1]

//console.log(c)


var o = {}
var b = {
    title: 'Biology',
    price: 120
}
b.available = 7

var obj = [
    { title: 'Biology', price: 120 },
    { title: 'Chemistry', price: 130 },
    { title: 'Physics', price: 125 },
    { title: 'Mathmatics', price: 110 }
]
var total = 0
for (var i of obj) total = total + i.price

//console.log(total)
obj.sort(compare)
    //console.log(obj)

var a = ['Latte', 'Mocha']
a.push('Expresso') // เพิ่ม หลังสุด
a.pop() // เอาหลังสุดออก
a.shift() // เอาหน้าสุดออก
a.unshift('Cappuccino') // เพิ่ม หน้าสุด

var wine = [150, 200, 100]
var tot = sell(wine, 1)
console.log(tot)

function sell(wine, year) {
    if (wine.length == 0) return 0

    var first = wine[0]
    var last = wine[wine.length - 1]


    var choice1 = first * year
    wine.shift()
    choice1 = choice1 + sell(wine, year + 1)
    wine.unshift(first)

    console.log(choice1)
    var choice2 = last * year
    wine.pop()
    choice2 = choice2 + sell(wine, year + 1)
    wine.push(last)


    if (choice1 > choice2) { return choice1 } else { return choice2 }
}