var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
