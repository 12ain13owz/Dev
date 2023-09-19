var express = require('express') // load module
var server = express() // สร้าง app หรือ server

server.listen(3000)
server.get('/total', showTotal)
server.get('/triangle', showTriangle)
server.get('/available', showArea)
server.get('/area/:width/:height', show)
server.get('/divisor/:number', showDivisor)

server.get('/index', function(req, res) {
    res.send('test')
})

function showDivisor(req, res) {
    var n = req.params.number
    var arr = []

    for (var i = 0; i <= n; i++) {
        var c = n % i
        if (c == 0) arr.push(i)
    }
    res.send(arr)
}

function show(req, res) {
    res.send({ result: req.params.width * req.params.height })
}

function showTotal(req, res) {
    var t = +req.query.price * 1.08
    res.send('Total is ' + t)
}

function showTriangle(req, res) {
    var a = +req.query.a
    var b = +req.query.b
    var c = +req.query.c

    if (a == b && a == c) res.send('Equilateral')
    else if (a == b || b == c || c == a) res.send('Isosceles')
    else res.send('Scalene')
}

function showArea(req, res) {
    var area = ['Bang Yai', 'Talingchan', 'Bang Plad', 'Bangkok Noi']
    var city = req.query.city
    var checked = 'No'

    for (var i of area)
        if (city == i) checked = 'Yes'

    res.send(checked)
}

// http://localhost:3000/triangle?a=8&b=5&c=8
// http://localhost:3000/available?city=Bangkok
// localhost:3000/divisor/12