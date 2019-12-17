var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

router.get('/all-wines', (req, res, next) => {
  db.wines.findAll({}).then(winedata => {
    res.json(winedata);
  });
});

router.post('/add-wine', (req, res, next) => {
  db.wines
    .create({
      vintage: req.body.vintage,
      country: req.body.country,
      region: req.body.region,
      varietal: req.body.varietal,
      producer: req.body.producer,
      ageability_index: req.body.ageability_index,
    })
    .then(winedata => {
      db.inventory
        .create({
          user_id: req.user.id,
          quantity: req.body.quantity,
          wine: winedata.id,
          vendor: req.body.vendor
        })
        .then(inventory => {
          res.json(inventory);
        })


    });
});

router.get('/all-users', (req, res, next) => {
  db.users.findAll({}).then(winedata => {
    res.json(winedata);
  });
});

router.post('/add-user', (req, res, next) => {
  db.users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then(userdata => res.json(userdata)); // sequelize promise
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json('/welcome');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
