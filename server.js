const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;;

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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});