var express = require('express')
var fs = require('fs')
var ejs = require('ejs')
var multer = require('multer')
var app = express()
var reader = multer({ dest: 'public/photo' })

app.engine('html', ejs.renderFile)
app.listen(3000)

app.get('/', function(q, s) {
    s.render('index.html')
})

app.get('/start', showStart)
app.post('/start', reader.single('photo'), savePhoto)
app.use(express.static('public'))

function showStart(req, res) {
    res.render('start.html')
}

function savePhoto(req, res) {
    fs.renameSync(`public/photo/${req.file.filename}`, `public/photo/${req.body.id}.jpg`)
    res.render('result.html', { photo: `photo/${req.body.id}.jpg` })
}


// npm install express ejs multer

/*
Using Post Method

1. Sensitive Information ข้อมูสำคัญ
2. File Upload
3. Large Data (Get ส่งข้อมูลได้ประมาณ 2k)
*/