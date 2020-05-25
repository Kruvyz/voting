const express = require('express');
const path = require('path');
const app = express();

const {
  getVoteById,
  getVotes,
  addVoteToVotes,
  updateVoteInVotes,
  addUser,
  checkUser,
  verifyUser,
  getUserLoginById
} = require('./mongo');

const port = process.env.PORT || 3010;

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

app.get('/result/:id', function (req, res) {
  const { id } = req.params;

  getVoteById(id)
    .then(responce => {
      if (responce.experts.length)
        res.render('diagram-page', {vote: responce});
      else
        res.render('no-result');   
    });

});

app.get('/results', function (req, res) {
  getVotes()
    .then(responce => {
      res.render('results-list', {votes: responce});   
    });

});

app.get('/vote/:id', function(req, res) {
  const { id } = req.params;

  res.render('voting-page', {id});
});

app.get('/voting-expert', function(req, res) {
  res.json({value: votingExpert});
});

app.get('/candidates/:id', function(req, res) {
  const { id } = req.params;

  getVoteById(id)
    .then(responce => {
      res.json(responce);
    });
});

app.post('/candidates', function(req, res) {
  const { vote } = req.body;

  addVoteToVotes({ ...vote, experts: [] })
    .then(id => {
      res.json(id);
    })
    .catch(error => {
      console.error(error.message);
    });
});

app.post('/vote', function(req, res) {
  const { vote } = req.body;

  updateVoteInVotes(vote);
});

app.post('/register', function(req, res){
  const user = req.body;
  addUser(user).then(() => {
    res.sendStatus(200);
  })
});

app.get('/verify/:login', function(req, res){
  const { login } = req.params;
  
  verifyUser(login).then(data => {
    res.json(data);
  })
});

app.post('/verify', function(req, res){
  const user = req.body;
  
  checkUser(user).then(data => {
    res.json(data);
  })
});

app.get('/user/:id', function(req, res) {
  const userId = req.params.id;

  getUserLoginById(userId).then(login => {
    res.json(login);
  });
});

app.get('/auth', function(req, res){
  res.render('auth');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});