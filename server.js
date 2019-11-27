const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

let votingExpert = 0;
let experts = [];
let candidates = [];

app.set('views', './src/pages');
app.set('view engine', 'pug');
app.use('/static', express.static('dist'));
app.use('/images', express.static('./images'));

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/create', function (req, res) {
  res.render('creating');
});

app.get('/result', function (req, res) {
  if (candidates.length && experts.length)
    res.render('diagram-page');
  else
    res.render('no-result');
});

app.get('/vote', function(req, res) {
  res.render('voting-page');
});

app.post('/voting-expert', function(req, res) {
  votingExpert++;
});

app.get('/voting-expert', function(req, res) {
  res.json({value: votingExpert});
});

app.put('/voting-expert', function(res, req) {
  votingExpert = 0;
});

app.get('/experts', function(req, res) {
  res.json(experts);
});

app.put('/experts', function(req, res) {
  experts.push(req.body.expert);
});

app.delete('/experts', function(req, res) {
  experts = [];
});

app.get('/candidates', function(req, res) {
  res.json(candidates);
});

app.put('/candidates', function(req, res) {
  candidates = [...req.body.candidate];
  res.sendStatus(200)
});

app.delete('/candidates', function(req, res) {
  candidates = [];
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});