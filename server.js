const express = require('express');
const path = require('path');
const app = express();

const {
  getResultsById,
  getResults,
  addResultToResults,
  updateResultToResults,
  changeResultToResults
} = require('./mongo');

const port = process.env.PORT || 3000;

app.set('views', './src/pages');
app.set('view engine', 'pug');
app.use('/static', express.static('dist'));
app.use('/images', express.static('./images'));

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results', function(req, res) {
  getResults()
    .then(response => res.render('results', { data: response }))
    .catch(error => {
      console.error(error.message);
    });
});

app.get('/votes', function(req, res) {
  getResults()
    .then(response => res.render('voting', { data: response }))
    .catch(error => {
      console.error(error.message);
    });
});

app.get('/create', function (req, res) {
  res.render('creating');
});

app.get('/result/:id', function (req, res) {
  const id = req.params.id;

  getResultsById(id).then(results => {
    if (results.candidates.length && results.experts.length)
      res.render('diagram-page', { data: results, id });
    else
      res.render('no-result');
  });
});

app.get('/vote/:id', function(req, res) {
  const id = req.params.id;
  res.render('voting-page', {id});
});

app.get('/voting-expert/:id', function(req, res) {
  const id = req.params.id;

  getResultsById(id).then(response => res.json({value: response.experts.length}));
});

app.get('/experts', function(req, res) {
  res.json(experts);
});

app.put('/experts/:id', function(req, res) {
  const id = req.params.id;
  const expert = req.body.expert;

  updateResultToResults(id, 'experts', expert)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(error.message);
    });
});

app.get('/candidates/:id', function(req, res) {
  const id = req.params.id;

  getResultsById(id).then(response => res.json(response.candidates));
});

app.post('/candidates', function(req, res) {
  const candidate = req.body.candidate;
  
  addResultToResults({ ...candidate, experts: [] })
    .then(id => {
      res.json({id});
    })
    .catch(error => {
      console.error(error.message);
    });
});

app.put('/candidates/:id', function(req, res) {
  const id = req.params.id;
  const candidates = req.body.candidates;
  
  changeResultToResults(id, 'candidates', candidates)
    .then(id => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(error.message);
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});