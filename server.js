const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

let votingExpert = 0;

app.set('views', './src/pages');
app.set('view engine', 'pug');
app.use('/static', express.static('dist'));
app.use('/images', express.static('./images'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/result', function (req, res) {
  res.render('diagram-page');
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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});