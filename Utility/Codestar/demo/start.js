var express = require('express') // load module
var ejs = require('ejs')
var server = express() // สร้าง app หรือ server

server.engine('html', ejs.renderFile) // ใช้สำหรับ renderFile .html
server.listen(3000)
server.get('/', showHome)

function showHome(req, res) {
    res.render('index.html')
}