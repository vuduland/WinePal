var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '🍷 Wine Pal 🍷' });
});

router.get('/dashboard', (req, res, next) => {
  if (!req.user) {
    res.json({});
  } else {
    db.inventory.findAll({
      where: {
        user_id: req.user.id
      },
      include: [
        {
          model: db.wines,
          as: 'wines',
          required: true
        }
      ]

    }).then(userWines => {
      res.render('dashboard', {
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        userWines: userWines,
      });
    })
  }
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


module.exports = router;
