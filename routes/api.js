var express = require('express');

var router = express.Router();

var db = require('../models');
var passport = require('../config/passport');

router.get('/all-wines', (req, res, next) => {
  try {
    db.Wine.findAll({}).then(winedata => {
      res.json(winedata);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/add-wine', (req, res, next) => {
  db.Wine.create({
    vintage: req.body.vintage,
    country: req.body.country,
    region: req.body.region,
    varietal: req.body.varietal,
    producer: req.body.producer,
    ageability_index: req.body.ageability_index,
    value: req.body.value,
  }).then(winedata => {
    db.Inventory.create({
      UserId: req.user.id,
      quantity: req.body.quantity,
      WineId: winedata.id,
      vendor: req.body.vendor,
    }).then(inventory => {
      // res.json(inventory);
      res.redirect('/dashboard');
    });
  });
});
router.post('/add-note', (req, res, next) => {
  db.History.create({
    UserId: req.user.id,
    notes: req.body.notes,
    personal_rating: req.body.rating,
    WineId: req.body.wine,
  }).then(notedata => {
    // res.json(inventory);
    res.redirect('/dashboard');
  });
});

router.get('/all-users', (req, res, next) => {
  try {
    db.User.findAll({}).then(winedata => {
      res.json(winedata);
    });
  } catch (err) {
    console.log(err);
    // error page here (unauthorized access?)
  }
});

router.post('/add-user', (req, res, next) => {
  try {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(userdata => res.redirect('/login'), passport.authenticate('local')); // sequelize promise
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res, next) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
});

router.get('/all-notes', (req, res, next) => {
  db.Wine.findAll({}).then(notes => {
    res.json(notes);
  });
});

router.post('/notes', (req, res, next) => {
  db.History.create({
    Wine: req.body,
    WineId: req.body.wine,
    UserId: req.user.id, // 'UserId' = pascal case
    personal_rating: req.body.personal_rating,
    notes: req.body.notes,
    purchase_date: req.body.purchase_date,
  }).then(History => {
    res.redirect('/dashboard');
  });
});

router.post('/increment-qty', (req, res, next) => {
  const newQty = req.body.qty + 1;
  try {
    db.Inventory.update(
      {
        quantity: newQty
      },
      {
        where: {
          wineId: req.body.wine
        }
      },
    )
    .then(newData => {
      res.json(newData);
    })

  } catch (error) {
    console.log(error)
  }
});

router.post('/decrement-qty', (req, res, next) => {
  const newQty = req.body.qty - 1;
  db.Inventory.update(
  {quantity: newQty},
  {where: req.body.inventoryId}
  )
  .then(newData => {
    res.json(newData);
  })
})

module.exports = router;

// NOTES ABOUT req...

// req.body vs req.user vs req.params
// req.body = form data,input data, or what you're getting from a post
// req.params is used with a get request, and gives you the url params
// req.user is a function of passport.js and is semi-magic
