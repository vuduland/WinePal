var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

router.get('/all-wines', (req, res, next) => {
  db.Wine.findAll({}).then(winedata => {
    res.json(winedata);
  });
});

router.post('/add-wine', (req, res, next) => {
  db.Wine.create({
    vintage: req.body.vintage,
    country: req.body.country,
    region: req.body.region,
    varietal: req.body.varietal,
    producer: req.body.producer,
    ageability_index: req.body.ageability_index,
  }).then(winedata => {
    db.Inventory.create({
      UserId: req.user.id,
      quantity: req.body.quantity,
      WineId: winedata.id,
      vendor: req.body.vendor,
    }).then(inventory => {
      res.json(inventory);
    });
  });
});

router.get('/all-users', (req, res, next) => {
  db.User.findAll({}).then(winedata => {
    res.json(winedata);
  });
});

router.post('/add-user', (req, res, next) => {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(userdata => res.redirect('/login'), passport.authenticate('local')); // sequelize promise
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/dashboard');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/all-notes', (req, res, next) => {
  db.Wine.findAll({}).then(notes => {
    res.json(notes);
  });
});

router.post('/add-notes', (req, res, next) => {
  db.History.create({
    WineId: req.body.wine,
    UserId: req.user.id, // 'UserId' = pascal case
    personal_rating: req.body.personal_rating,
    notes: req.body.notes,
    purchase_date: req.body.purchase_date,

  }).then(notes => {
    res.redirect('/dashboard');
  });
});

module.exports = router;

// NOTES ABOUT req...

// req.body vs req.user vs req.params
// req.body = form data,input data, or what you're getting from a post
// req.params is used with a get request, and gives you the url params
// req.user it's a function of passport.js and is semi-magic

