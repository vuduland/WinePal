var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/all-wines', (req, res, next) => {
  db.wines.findAll({}).then(data => {
    res.json(data);
  });
});
router.get('/api/all-users', (req, res, next) => {
  db.users.findAll({}).then(data => {
    res.json(data);
  });
});

router.post('/api/add-wine', (req, res, next) => {
  db.wines
    .create({
      vintage: 2004,
      country: 'USA',
      region: 'California',
      varietal: 'merlot',
      producer: 'Marcle',
      ageability_index: 10,
    })
    .then(data => {
      res.json(data);
    });
});
router.post('/api/add-user', (req, res, next) => {
  db.users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then(data => res.json(data));
});

router.post('/api/login', passport.authenticate('local'), (req, res, next) => {
  res.json('/welcome');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', (req, res, next) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      name: req.user.name,
      email: req.user.email,
    });
  }
});

module.exports = router;
