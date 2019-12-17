var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

router.get('/all-wines', (req, res, next) => {
  db.wines.findAll({}).then(data => {
    res.json(data);
  });
});

router.post('/add-wine', (req, res, next) => {
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

router.get('/all-users', (req, res, next) => {
  db.users.findAll({}).then(data => {
    res.json(data);
  });
});

router.post('/add-user', (req, res, next) => {
  db.users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then(data => res.json(data)); // sequelize promise
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json('/welcome');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
