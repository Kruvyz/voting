const express = require('express');
const path = require('path');
const app = express();
const {
  getResultsById,
  getResults,
  addResultToResults
} = require('./mongo');

const port = process.env.PORT || 3000;;

app.set('views', './src/pages');
app.set('view engine', 'pug');
app.use('/static', express.static('dist'));

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/results-render', function (req, res) {
  res.render('diagram-page');
});

app.get('/results/:id', function(req, res) {
  const id = req.params.id;

  getResults(id)
    .then(response => res.send(response))
    .catch(error => {
      console.error(error.message);
    });
});

app.get('/results', function(req, res) {
  getResultsById()
    .then(response => res.send(response))
    .catch(error => {
      console.error(error.message);
    });
});

app.put('/results', function(req, res) {
  const result = req.body;

  addResultToResults(result)
    .then(response => res.sendStatus(200))
    .catch(error => {
      console.error(error.message);
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});