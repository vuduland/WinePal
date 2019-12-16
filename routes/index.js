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
