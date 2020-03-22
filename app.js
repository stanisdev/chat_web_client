'use string'

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const port = 4000;

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/auth/login', function(req, res) {
  res.render('auth/login.html');
});

app.get('/chats', function(req, res) {
  res.render('chats/index.html');
});

app.listen(port);
console.log(`Web client of chat application was runned on ${port}`);