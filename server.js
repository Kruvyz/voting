const express = require('express');
const path = require('path');
const app = express();

const {
  getResultsById,
  getResults,
  addResultToResults,
  updateResultToResults
} = require('./mongo');

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
  res.render('diagram-page');   
});

app.get('/no-result', function (req, res) {
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

app.post('/candidates', function(req, res) {
  const candidate = req.body.candidate;

  candidates = [...candidate]
  res.sendStatus(200);
  // addResultToResults({ ...candidates, experts: [] })
  //   .then(id => console.log(res.json({id, name: "ffff"})))
  //   .catch(error => {
  //     console.error(error.message);
  //   });
  //   res.json({name: 'dddd'});
});

app.post('/a', function(req, res) {
  console.log('------------------');
  res.json({f: 'dd'});
})

app.delete('/candidates', function(req, res) {
  candidates = [];
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});