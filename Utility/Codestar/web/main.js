var express = require('express')
var ejs = require('ejs')
var app = express()

app.engine('html', ejs.renderFile)
app.listen(3000)

var mysql = require('mysql')
var url = 'mysql://james:bond@35.198.242.215/web'
var pool = mysql.createPool(url)
var valid = []
var coffee = ['Latte', 'Mocha', 'Americano', 'Esprresso']

pool.query('SELECT * FROM member', show)

/* old
var con = mysql.createConnection(url)
con.connect(Ready)
function Ready() {
    con.query('SELECT * FROM member', show)
}
*/

function show(err, data) {
    //console.log(data)
}

app.get('/', showHome)
app.get('/login', LogInPage)
app.get(['/register', '/join', '/signup'], RegisterPage)
app.post(['/register', '/join', '/signup'], extractPost, NewMember)
app.post('/login', extractPost, CheckLogin)
app.get('/profile', extractCookie, showProfile)
app.get('/logout', extractCookie, showLogOutPage)
app.get('/product', showProduct)
app.use(express.static('public'))
app.use(showError)

function showProduct(req, res) {
    res.render('product.html', { coffee: coffee })
}

function showError(req, res, next) {
    res.render('error.html')
}

function showHome(req, res) {
    res.render('index.html')
}

function LogInPage(req, res) {
    res.render('login.html')
}

function RegisterPage(req, res) {
    res.render('register.html')
}

function extractPost(req, res, next) {
    var all = ''

    req.on('data', function(data) { all = all + data })
    req.on('end', function() {
        req.body = extract(decodeURIComponent(all))
        next()
    })
}

function NewMember(req, res) {
    var sql = `INSERT INTO member(email, password, firstname, familyname) 
    values(?, sha2(?, 512), ?, ?)`

    var user = req.body
    var data = [user.email, user.password, user.first, user.family]

    pool.query(sql, data, function() {
        res.redirect('/login')
    })
}

function CheckLogin(req, res) {
    var sql = 'SELECT * FROM member WHERE email = ? and password= sha2(?, 512)'
    var user = req.body
    var data = [user.email, user.password]

    pool.query(sql, data, function(err, rows) {
        if (rows.length == 0) res.send('Failed')
        else {
            var card = '1234-ABC-7789'
            valid[card] = rows[0]
            res.header('Set-Cookie', 'card=' + card)
            res.redirect('/profile')
        }

    })
}

function showProfile(req, res) {
    console.log(req.cookie.card)
        //console.log(valid[req.cookie.card])
    if (valid[req.cookie.card] == null) res.redirect('/login')
    else res.render('profile.html', valid[req.cookie.card])
}

function extract(s) {
    var o = {}
    var a = s.split('&')

    for (var i of a) {
        var pair = i.split('=')
        o[pair[0]] = pair[1]
    }
    return o
}

function showLogOutPage(req, res) {
    delete valid[req.cookie.card]
    res.send("You've been logged out.")
}

function extractCookie(req, res, next) {
    var s = ''
    if (req.headers.cookie != null) s = req.headers.cookie
    req.cookie = extract(s)
    next()
}

/*
  ?price=120 => req.query.price
  /price/120 => req.params.price
*/

/*

15/05/2018
Create Ubunto Server 18.04
sudo apt update
sudo apt install mysql-server
sudo mysql
create database web default charset 'UTF8';
create user james identified by 'bond';
grant all on web.* to james;
exit;

mysql --user james --password
show databases;
use web;
create table member (
  id serial, -- bigint auto_increment unique,
  email varchar(80) unique,
  password varchar(128),
  firstname varchar(80),
  familyname varchar(80)
);

insert into member(email, password, firstname, familyname)
values('jaes@bond.com', sha2('james123', 512), 'James', 'Bond');

exit;

sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
# bind-address = 127.0.0.1
sudo service mysql restart

// สร้าง firewall rules port mysql 3306

*/